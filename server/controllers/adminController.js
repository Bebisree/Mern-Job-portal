const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();
    const totalCandidates = await User.countDocuments({ role: "candidate" });
    const totalEmployers = await User.countDocuments({ role: "employer" });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    const pendingApplications = await Application.countDocuments({ status: "Pending" });
    const acceptedApplications = await Application.countDocuments({ status: "Accepted" });
    const rejectedApplications = await Application.countDocuments({ status: "Rejected" });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalCandidates,
        totalEmployers,
        totalJobs,
        totalApplications,
        pendingApplications,
        acceptedApplications,
        rejectedApplications
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Jobs (Admin view)
const getAllJobsAdmin = async (req, res) => {
  try {

    const jobs = await Job.find().populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      jobs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Job (Admin)
const deleteJobAdmin = async (req, res) => {
  try {

    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Job Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




module.exports = {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllJobsAdmin,
  deleteJobAdmin,
  
};