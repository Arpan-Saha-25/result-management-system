const express = require('express');
const app = express();
const port = 3000;
const userModel = require('./models/user');
const dbconnection = require('./config/db');
const bcrypt = require('bcrypt'); // For password hashing
const session = require('express-session');

app.use(
  session({
    secret:'your_secret_key',
    resave: false,
    saveUninitialized: false,
  }));
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
}
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', isAuthenticated,(req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/get-form-data', async (req, res) => {
  try {
    const { studentId, password } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ studentId });
    if (!user) {
      return res.status(400).send('Invalid studentId .');
    }

    const userPassword = await userModel.findOne({ password });
    if (!userPassword) {
      return res.status(400).send('Invalid password.');
    }

    // Compare the provided password with the stored hashed password
    /*const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid studentId or password.');
    }*/
   req.session.user = {id: user._id, studentId: user.studentId};

   res.redirect('/');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('An error occurred while logging in.');
  }
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  try {
    console.log(req.body);

    // Destructure and validate required fields
    const { firstName, lastName, studentId, emailId, department, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !studentId || !emailId || !department || !password || !confirmPassword) {
      return res.status(400).send('All fields are required.');
    }

    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match.');
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new userModel({
      firstName: firstName,
      lastName: lastName,
      studentId: studentId,
      emailId: emailId,
      department: department,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).send('User registered successfully!');
  } catch (error) {
    console.error('Error registering user:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).send(error.message);
    }

    res.status(500).send('An error occurred while registering the user.');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});