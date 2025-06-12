# Updated Flask App for Result Management using 'resultManagement' DB
from flask import Flask, render_template, request, redirect, session
from pymongo import MongoClient

app = Flask(__name__)
app.secret_key = 'your-secret-key'

# Connect to MongoDB
client = MongoClient("mongodb+srv://pymongo:projectmongo@cluster0.n6ubcpo.mongodb.net/")
db = client["resultManagement"]
users_collection = db["users"]
results_collection = db["results"]

# Admin credentials
ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD = 'password'

@app.route('/')
def home():
    return redirect('/login')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if request.form['username'] == ADMIN_USERNAME and request.form['password'] == ADMIN_PASSWORD:
            session['admin'] = True
            return redirect('/dashboard')
        return "Invalid credentials"
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('admin', None)
    return redirect('/login')

@app.route('/dashboard')
def dashboard():
    if 'admin' not in session:
        return redirect('/login')

    students = []
    results = db.results.find()
    
    for result in results:
        user = db.users.find_one({'studentId': result['studentId']})
        if user:
            student_data = {
                'studentId': result['studentId'],
                'name': user.get('firstName', '') + ' ' + user.get('lastName', ''),
                'department': user.get('department', ''),
                'subjects': result.get('subjects', []),
                'totalMarks': result.get('totalMarks', 0),
                'percentage': result.get('percentage', 0),
                'grade': result.get('grade', '')
            }
            students.append(student_data)

    return render_template('dashboard.html', students=students)




@app.route('/view', methods=['GET', 'POST'])
def view_form():
    if 'admin' not in session:
        return redirect('/login')

    if request.method == 'POST':
        student_id = request.form['student_id']
        user = db.users.find_one({'studentId': student_id})
        result = db.results.find_one({'studentId': student_id})

        if not user or not result:
            return "Student result not found"

        # Merge user and result data
        student = {
            'studentId': student_id,
            'name': user.get('firstName', '') + ' ' + user.get('lastName', ''),
            'emailId': user.get('emailId', ''),
            'department': user.get('department', ''),
            'subjects': result.get('subjects', []),
            'totalMarks': result.get('totalMarks', 0),
            'percentage': result.get('percentage', 0),
            'grade': result.get('grade', '')
        }

        return render_template('view_student.html', student=student)

    return render_template('view_form.html')









@app.route('/add', methods=['GET', 'POST'])
def add_student():
    if 'admin' not in session:
        return redirect('/login')

    if request.method == 'POST':
        student_id = request.form['student_id']
        user = users_collection.find_one({'studentId': student_id})
        if not user:
            return "No user found with that Student ID!"
        if results_collection.find_one({"studentId": student_id}):
            return "A result with this Student ID already exists!"

        subjects = [
            {"name": request.form[f'subject{i}'], "marks": int(request.form[f'marks{i}'])}
            for i in range(1, 7)
        ]
        total_marks = sum(sub["marks"] for sub in subjects)
        percentage = round(total_marks / 6, 2)
        grade = calculate_grade(percentage)

        result = {
            "studentId": student_id,
            "name": user['firstName'] + " " + user['lastName'],
            "department": user['department'],
            "subjects": subjects,
            "totalMarks": total_marks,
            "percentage": percentage,
            "grade": grade
        }

        results_collection.insert_one(result)
        return redirect('/dashboard')

    return render_template('add_student.html')

@app.route('/update', methods=['GET', 'POST'])
def update_form():
    if 'admin' not in session:
        return redirect('/login')
    if request.method == 'POST':
        student_id = request.form['student_id']
        result = results_collection.find_one({'studentId': student_id})
        if result:
            return redirect(f"/update/{student_id}")
        else:
            return "Student ID not found"
    return render_template('update_form.html')

@app.route('/update/<student_id>', methods=['GET', 'POST'])
def update_student(student_id):
    if 'admin' not in session:
        return redirect('/login')

    result = results_collection.find_one({'studentId': student_id})

    if request.method == 'POST':
        subjects = [
            {"name": request.form[f'subject{i}'], "marks": int(request.form[f'marks{i}'])}
            for i in range(1, 7)
        ]
        total_marks = sum(sub["marks"] for sub in subjects)
        percentage = round(total_marks / 6, 2)
        grade = calculate_grade(percentage)

        updated_result = {
            "subjects": subjects,
            "totalMarks": total_marks,
            "percentage": percentage,
            "grade": grade
        }

        results_collection.update_one({'studentId': student_id}, {'$set': updated_result})
        return redirect('/dashboard')

    return render_template('update_student.html', result=result)

@app.route('/delete', methods=['GET', 'POST'])
def delete_form():
    if 'admin' not in session:
        return redirect('/login')

    if request.method == 'POST':
        student_id = request.form['student_id']
        result = results_collection.find_one({'studentId': student_id})
        if not result:
            return "Student ID not found"
        return render_template('confirm_delete.html', result=result)

    return render_template('delete_form.html')

@app.route('/confirm_delete/<student_id>', methods=['POST'])
def confirm_delete(student_id):
    if 'admin' not in session:
        return redirect('/login')

    result = results_collection.delete_one({'studentId': student_id})
    if result.deleted_count:
        return redirect('/dashboard')
    return "Error deleting result"

@app.route('/results')
def view_results():
    students = list(results_collection.find())
    return render_template('view_results.html', students=students)

def calculate_grade(percentage):
    if percentage >= 90:
        return "A+"
    elif percentage >= 80:
        return "A"
    elif percentage >= 70:
        return "B+"
    elif percentage >= 60:
        return "B"
    elif percentage >= 50:
        return "C"
    else:
        return "F"

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=5004)

