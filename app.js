const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse POST data
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set views and public directory
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/get-form-data', (req, res) => {
    // Handle login POST data
    const { studentId, password } = req.body;
    console.log("Login:", studentId, password);
    res.send('Login submitted!');
});

app.post('/register', (req, res) => {
    // Handle registration POST data
    console.log("Register:", req.body);
    res.send('Registration successful!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
