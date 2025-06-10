// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//     },
//     lastName: {
//         type: String,
//         required: true,
//     },
//     studentId: {
//         type: String,
//         required: true,
//         unique: true,
//         minlength: 10,
//         maxlength: 10,
//     },
//     emailId: {
//         type: String,
//         required: true,
//         unique: true,
//         match: [/.+\@.+\..+/, 'Please fill a valid email address']
//     },
//     department: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     }
// }, { timestamps: true });

// const userModel = mongoose.model('User', userSchema);

// module.exports = userModel;

// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    studentId: { type: String, unique: true },
    emailId: String,
    department: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);
