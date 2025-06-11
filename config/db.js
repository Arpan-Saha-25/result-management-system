// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const dbPath = process.env.DB_PATH;

mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));
