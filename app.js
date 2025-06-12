// app.js
require('dotenv').config(); // Load .env
require('./config/db'); // MongoDB Connection

const express = require('express');
const session = require('express-session'); // session middleware
const path = require('path');
const app = express();
const PORT = 3000;

app.use(session({
    secret: 'your-secret-key',
    resave: false,  // prevent saving session if nothing changes
    saveUninitialized: false // no empty sessions
}));

const resultRoutes = require('./routes/resultRoutes');
app.use('/', resultRoutes);


// Body parser : parses to req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files (public folder)
app.use(express.static(path.join(__dirname, 'public')));

// View engine : sets the folder to your EJS templ.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
