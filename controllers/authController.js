// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Result = require('../models/result');


exports.getHome = (req, res) => {
    res.render('home');
};


exports.getLogin = (req, res) => {
    res.render('login');
};

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.postRegister = async (req, res) => {
    const { firstName, lastName, studentId, emailId, department, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !studentId || !emailId || !department || !password || !confirmPassword) {
        return res.status(400).send('All fields are required.');
    }

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match.');
    }

    try {
        // 👉 Check if studentId already exists
        const existingUser = await User.findOne({ studentId });
        if (existingUser) {
            return res.status(400).send('Student ID already registered.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            studentId,
            emailId,
            department,
            password: hashedPassword
        });

        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send("Something went wrong during registration.");
    }
};


exports.postLogin = async (req, res) => {
    const { studentId, password } = req.body;

    try {
        const user = await User.findOne({ studentId });
        if (!user) return res.status(400).send('Invalid student ID or password');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid student ID or password');

        req.session.user = { id: user._id, studentId: user.studentId };
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error logging in.');
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};



exports.getDashboard = async (req, res) => {
    const studentId = req.session.user.studentId;

    try {
        const result = await Result.findOne({ studentId });
        res.render('index', { user: req.session.user, result });
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Error loading dashboard");
    }
};
