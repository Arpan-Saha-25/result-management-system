// config/db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pymongo:projectmongo@cluster0.n6ubcpo.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});
