
// app.js
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 3000;

require('dotenv').config(); // Load .env
require('./config/db'); // MongoDB Connection

app.use(session({
    secret: 'your-secret-key',
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
