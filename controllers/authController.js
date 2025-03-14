// External imports
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Internal imports
const User = require("../models/User");
const transporter = require("../middlewares/users/mailer");

// Get login page (for frontend navigation)
function getLogin(req, res, next) {
    console.log("Get");
    res.status(200).json({
      success: true,
      message: "Welcome to the login route!",
    });
  }

// User Login
async function postLogin(req, res, next) {
    try {
      const { email, password } = req.body;
  
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found. Please sign up.",
        });
      }


  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials. Please check your email and password.",
        });
      }
  
      // Generate JWT token
      const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      // Store token in an HTTP-only cookie
       res.cookie("token", token, {
       httpOnly: true,
       secure: process.env.NODE_ENV === "production", // Use secure cookies in production
       sameSite: "strict",
       maxAge: 3600000, // 1 hour
       });

    res.status(200).json({ success: true, message: "Login successful!" });
      
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred during login. Please try again.",
      });
    }
  }

// User Registration (Signup)
async function addUser(req, res, next) {
    console.log("POST request received");
  
    // Ensure password and confirmPassword match
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }
  
    try {
      const verificationCode = generateVerificationCode();
      const verificationCodeExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours expiry
  
      let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        verificationCode,
        verificationCodeExpires,
        // Only include other fields if they are present, otherwise leave them out.
        firstName: req.body.firstName || '',
        lastName: req.body.lastName || '',
        username: req.body.username || `${req.body.firstName} ${req.body.lastName}`,
      });
  
      console.log("Received body", req.body);
  
      if (!req.body.password || req.body.password.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Password is required",
        });
      }
  
      const result = await newUser.save();
  
      // Send verification email
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: req.body.email,
        subject: "Verify Your Email Address",
        text: `Your verification code is: ${verificationCode}\n\n`,
      };
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({
        success: true,
        message: "User registered successfully. Please check your email to verify your account!",
      });
    } catch (err) {
      console.error("Error in addUser:", err);
      res.status(500).json({
        success: false,
        message: "Unknown error occurred!",
      });
    }
  }
// Verify Email
async function verifyEmail(req, res) {
    const { email, code } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ success: false, message: "User not found." });
      }

      if (user.verificationCode !== code) {
        return res.status(400).json({ success: false, message: "Invalid verification code." });
      }
  
      if (user.verificationCodeExpires < Date.now()) {
        return res.status(400).json({ success: false, message: "Verification code has expired." });
      }
  
      user.verificationCode = undefined;
      user.verificationCodeExpires = undefined;
      await user.save();
  
      res.status(200).json({ success: true, message: "Email verified successfully!" });
    } catch (err) {
      console.error("Error in email verification:", err);
      res.status(500).json({ success: false, message: "Unknown error occurred." });
    }
  }
// Get User Profile
async function editProfilePage(req, res) {
  console.log("User in User Profile:", req.user);

  try {
    // Fetch the user's profile from the database using the authenticated user ID
    const {email} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the current user profile data (skills, causes, etc.)
    res.json({
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      skills: req.user.skills,
      causesSupported: req.user.causesSupported,
      email: req.user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error: error.message });
  }
}
// Update user profile
async function editProfile(req, res) {
  console.log("Hit");
  console.log("User in editProfile:", req.user);

  const { skills, causesSupported } = req.body;

  try {
    // Validate that the required fields are present
    if (!skills || !Array.isArray(skills) || !causesSupported || !Array.isArray(causesSupported)) {
      return res.status(400).json({ message: "Skills and causesSupported must be provided as arrays" });
    }

    // Update the user's profile
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $set: { skills, causesSupported } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send back the updated user profile
    res.json({
      message: "Profile updated successfully",
      user: {
        skills: user.skills,
        causesSupported: user.causesSupported,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
}


  function generateVerificationCode() {
    return crypto.randomInt(100000, 999999).toString();
  }
  module.exports ={
      getLogin,
      addUser,
      verifyEmail,
      postLogin,
      editProfilePage,
      editProfile
  };      