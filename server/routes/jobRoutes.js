const express = require("express");
const router = express.Router();

const {authMiddleware} = require("../middleware/authMiddleware");

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getEmployerJobs
} = require("../controllers/jobController");


// Create Job
router.post("/", authMiddleware, createJob);


// Employer Jobs
router.get("/employer", authMiddleware, getEmployerJobs);


// All Jobs (Candidate)
router.get("/", getAllJobs);


// Single Job
router.get("/:id", getJobById);


// Update Job
router.put("/:id", authMiddleware, updateJob);


// Delete Job
router.delete("/:id", authMiddleware, deleteJob);


module.exports = router;
console.log("authMiddleware:", typeof authMiddleware);
console.log("createJob:", typeof createJob);
console.log("getAllJobs:", typeof getAllJobs);
console.log("getJobById:", typeof getJobById);
console.log("updateJob:", typeof updateJob);
console.log("deleteJob:", typeof deleteJob);
console.log("getEmployerJobs:", typeof getEmployerJobs);