const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
      firstName: {    
        type: String,
        required: false,
        trim: true,
      },
      lastName: {    
        type: String,
        required: false,
        trim: true,
      },
      username: {    
        type: String,
        trim: true,
        unique: true,
        sparse: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
      },
      avatar: { 
        type: String // Single profile image URL
      },
      skills: {
        type: [String], // Array of user skills
        required: false,
        default: []
      },
      causesSupported: {
        type: [String], // Causes user supports (e.g., education, healthcare)
        required: false,
        default: []
      },
      volunteerHistory: [
        {
          eventId: mongoose.Schema.Types.ObjectId, // Reference to a volunteering event
          title: String, // Event name
          date: Date, // Date of participation
          hoursContributed: Number, // Number of hours volunteered
          role: String, // e.g., Organizer, Participant
        }
      ],
      verificationCode: String, 
      verificationCodeExpires: Date,
      isPasswordHashed: { type: Boolean, default: false },
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },
    },
    {
      timestamps: true,
    }
  );

// Hash password before saving (if modified or new)
userSchema.pre("save", async function (next) {
    if (!this.googleId && !this.password) {
      return next(new Error("Either Google ID or Password is required"));
    }
    
    if (this.isModified("password")) {
      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.isPasswordHashed = true;
      } catch (error) {
        return next(error);
      }
    }
    
    next();
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
