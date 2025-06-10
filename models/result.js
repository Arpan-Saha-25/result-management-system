const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    subjects: [
        {
            name: String,
            marks: Number
        }
    ],
    totalMarks: Number,
    percentage: Number,
    grade: String
});

module.exports = mongoose.model('Result', resultSchema);
