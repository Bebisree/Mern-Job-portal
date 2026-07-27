const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");

const {
  applyJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
  getEmployerStats,
} = require("../controllers/applicationController");

// ==============================
// Candidate Routes
// ==============================

// Apply for a Job
router.post("/apply/:jobId", authMiddleware, applyJob);

// Get Logged-in Candidate Applications
router.get("/my-applications", authMiddleware, getMyApplications);

// ==============================
// Employer Routes
// ==============================

// Get Applicants for a Job
router.get("/job/:jobId", authMiddleware, getApplicants);

// Employer Dashboard Statistics
router.get("/employer-stats", authMiddleware, getEmployerStats);

// Update Application Status
router.put("/status/:id", authMiddleware, updateApplicationStatus);

module.exports = router;