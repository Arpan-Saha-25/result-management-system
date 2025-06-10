// config/db.js
const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();

const dbPath = process.env.DB_PATH;

// Use it (example: print or connect to MongoDB)
// console.log("Database Path:", dbPath);



mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});
