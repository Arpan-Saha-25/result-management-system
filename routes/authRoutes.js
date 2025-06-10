// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuthenticated = require('../middleware/authMiddleware');

// Public routes
router.get('/', authController.getHome);
router.get('/login', authController.getLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);

// Protected
router.get('/dashboard', isAuthenticated, authController.getDashboard);
router.get('/logout', authController.logout);

module.exports = router;
