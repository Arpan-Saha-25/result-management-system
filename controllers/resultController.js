// controllers/resultController.js
const Result = require('../models/result');
const User = require('../models/user');

exports.getAddResult = (req, res) => {
    res.render('addResult');
};

exports.postAddResult = async (req, res) => {
    const { studentId, subjects } = req.body;

    const parsedSubjects = JSON.parse(subjects); // Array of objects {name, marks}
    const totalMarks = parsedSubjects.reduce((sum, s) => sum + parseInt(s.marks), 0);
    const percentage = totalMarks / (parsedSubjects.length * 100) * 100;

    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';

    const newResult = new Result({
        studentId,
        subjects: parsedSubjects,
        totalMarks,
        percentage,
        grade
    });

    try {
        await newResult.save();
        res.send('Result added successfully');
    } catch (error) {
        console.error("Error adding result:", error);
        res.status(500).send("Error saving result");
    }
};

exports.getStudentResult = async (req, res) => {
    const studentId = req.session.user.studentId;

    try {
        const result = await Result.findOne({ studentId });
        res.render('myResult', { result });
    } catch (error) {
        console.error("Error fetching result:", error);
        res.status(500).send("Could not fetch result");
    }
};

exports.getAllResults = async (req, res) => {
    try {
        const allResults = await Result.find({});
        res.render('allResults', { results: allResults });
    } catch (error) {
        console.error("Error fetching all results:", error);
        res.status(500).send("Error fetching results");
    }
};
