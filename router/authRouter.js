// external imports
const express = require('express');
// internal imports
const {addUserValidators}= require("../middlewares/users/userValidators");
const{} = require("../middlewares/users/sessionMiddleware");
const User = require("../models/User");
const { 
    getLogin, 
    addUser, 
    verifyEmail, 
    postLogin, 
    editProfilePage,
    editProfile,
    editVolunteerHistory
  } = require("../controllers/authController");
const authMiddleware = require("../middlewares/users/authMiddleware");
const router = express.Router();



router.post("/register",addUserValidators,addUser); 
router.post("/login", postLogin); 
router.post("/verify-email", verifyEmail);

// Route to display the edit profile page (GET /profile/edit)
router.get("/profile/edit",authMiddleware,editProfilePage);
router.put("/profile/editButton",authMiddleware,editProfile);
router.put("/profile/editVolunteerHistory",authMiddleware,editVolunteerHistory);
module.exports = router;