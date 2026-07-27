const express = require("express");

const router = express.Router();

const {authMiddleware} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    uploadResume,
    toggleNotification
} = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get Profile
router.get("/profile", authMiddleware, getProfile);

// Update Profile
router.put("/profile", authMiddleware, updateProfile);

// Upload Resume
router.post(
    "/upload-resume",
    authMiddleware,
    upload.single("resume"),
    uploadResume
);
router.put(
  "/notification",
  authMiddleware,
  toggleNotification
);

module.exports = router;