// const express = require('express');
// const path = require('path');
// const app = express();
// const PORT = 3000;

// app.use(express.static(path.join(__dirname, 'public')));

// // Middleware to parse POST data
// app.use(express.urlencoded({ extended: true }));

// // Set EJS as the view engine
// app.set('view engine', 'ejs');

// // Set views and public directory
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.get('/login', (req, res) => {
//     res.render('login');
// });

// app.get('/register', (req, res) => {
//     res.render('register');
// });

// app.post('/get-form-data', (req, res) => {
//     // Handle login POST data
//     const { studentId, password } = req.body;
//     console.log("Login:", studentId, password);
//     res.send('Login submitted!');
// });

// app.post('/register', (req, res) => {
//     // Handle registration POST data
//     console.log("Register:", req.body);
//     res.send('Registration successful!');
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
// });

// app.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const PORT = 3000;

require('dotenv').config(); // Load .env
require('./config/db'); // MongoDB Connection

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false
}));

const resultRoutes = require('./routes/resultRoutes');
app.use('/', resultRoutes);


// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
