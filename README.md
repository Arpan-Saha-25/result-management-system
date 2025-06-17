# 🎓 Student Result Management System

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.10+-yellow.svg)](https://www.python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)

A full-stack web application for managing and viewing student results, with **Node.js + Express** for students and **Python + Flask** for admin. Data is stored in a shared **MongoDB Atlas** database.

🔗 GitHub Repository: [Arpan-Saha-25/result-management-system](https://github.com/Arpan-Saha-25/result-management-system.git)

---

## 🧩 Features

### 👨‍🎓 Student Portal (Node.js)
- Register with Student ID, Department, Email
- Secure login with hashed passwords (bcrypt)
- View individual results with grades and percentages

### 🧑‍💼 Admin Panel (Flask)
- Login with admin credentials
- Add/update/delete student results
- View all results with total marks, grade, percentage
- Integrated with same MongoDB database

---

## ⚙️ Tech Stack

| Layer         | Technology                         |
|---------------|-------------------------------------|
| Frontend      | HTML, CSS, JavaScript, EJS         |
| Styling       | Custom CSS, Responsive Design      |
| Backend       | Node.js + Express (students)       |
| Admin Backend | Python + Flask                     |
| Database      | MongoDB Atlas (Cloud NoSQL)        |
| Auth & Security | bcrypt, express-session, Flask sessions |


---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js ≥ 18
- Python ≥ 3.10
- MongoDB Atlas account

---

### 🖥️ Run the Student Portal (Node.js)
```bash
# Install Node dependencies
npm install

# Create a .env file with:
DB_PATH=mongodb+srv://<your-mongodb-connection-string>

# Start server
npx nodemon app.js
````

App runs on: `http://localhost:3000`

---

### 🐍 Run the Admin Panel (Flask)

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows

# Install dependencies
pip install flask pymongo dnspython

# Run Flask server
python app.py
```

Admin panel runs on: `http://localhost:5004`

---

## 🧪 Admin Credentials (Default)

```
Username: admin
Password: password
```

*(You can change this in `app.py`)*

---

## ✅ To-Do / Future Improvements

* Role-based access control
* Admin user model
* Email notifications on result update
* Mobile responsiveness
* Dockerize both apps for deployment

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Author

Developed by [Arpan Saha](https://github.com/Arpan-Saha-25) and my team - 
Student Result Management System · 2025
