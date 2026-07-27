const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();


// CORS Middleware

app.use(cors({
    origin: true,
    credentials: true
}));


    

// JSON Middleware
app.use(express.json());


// Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Test Route
app.get("/api/auth/test", (req, res) => {
    res.json({ message: "Auth Route Working" });
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);


// Home Route
app.get("/", (req, res) => {
    res.send("🚀 Job Search Portal Backend Running...");
});


module.exports = app;