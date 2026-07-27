const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ============================
// Register User
// ============================
const registerUser = async (req, res) => {
    try {
        console.log(req.body);

        const { name, email, password, phone, role } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role
        });

        // Generate JWT Token
        console.log("User Role Before Token:", user.role);
    const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
);
console.log("New Token:", token);
        res.status(201).json({

            success: true,

            message: "Registration Successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ============================
// Login User
// ============================
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find User
        const user = await User.findOne({ email });
        if (!user) {
    return res.status(404).json({
        message: "User Not Found"
    });
}

console.log("LOGIN ROLE:", user.role);
        

        if (!user) {

            return res.status(404).json({
                message: "User Not Found"
            });
            console.log("LOGIN ROLE:", user.role);

        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid Password"
            });

        }

        // Generate JWT
        const token = jwt.sign(
    {
        id: user._id,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ============================
// Get User Profile
// ============================
const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ============================
// Update User Profile
// ============================
const updateProfile = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.user.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
// ============================
// Upload Resume
// ============================
const uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF resume"
            });
        }
const user = await User.findByIdAndUpdate(
    req.user.id,
    {
        resume: req.file.filename
    },
    {
        new: true
    }
);
       

        res.status(200).json({
            success: true,
            message: "Resume Uploaded Successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const toggleNotification = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.notificationPreference = !user.notificationPreference;

    await user.save();

    res.json({
      success: true,
      message: "Notification preference updated",
      notificationPreference: user.notificationPreference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    uploadResume,
    toggleNotification,
};