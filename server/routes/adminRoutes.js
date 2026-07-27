const express = require("express");
const router = express.Router();

const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllJobsAdmin,
  deleteJobAdmin,
  
} = require("../controllers/adminController");

// Dashboard Stats
router.get("/stats", authMiddleware, isAdmin, getDashboardStats);

// Users
router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.delete("/users/:id", authMiddleware, isAdmin, deleteUser);

// Jobs
router.get("/jobs", authMiddleware, isAdmin, getAllJobsAdmin);
router.delete("/jobs/:id", authMiddleware, isAdmin, deleteJobAdmin);

module.exports = router;