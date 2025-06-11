// routes/resultRoutes.js
const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');
const isAuthenticated = require('../middleware/authMiddleware');

// Routes
router.get('/my-result', isAuthenticated, resultController.getStudentResult);
router.get('/add-result', isAuthenticated, resultController.getAddResult);
router.post('/add-result', isAuthenticated, resultController.postAddResult);
router.get('/my-result', isAuthenticated, resultController.getStudentResult);
router.get('/results', isAuthenticated, resultController.getAllResults); // For admin

module.exports = router;
