const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost:27017/ResultManagement').then(() => {
    console.log('Connected to MongoDB');
})

module.exports = connection;