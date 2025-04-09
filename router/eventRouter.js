// external imports
const express = require('express');
// internal imports
const Event = require("../models/eventModel");
const { 
  createEvent,
  getEvents,
  joinEvent,
  createHelpPost 
  } = require("../controllers/eventController");
const authMiddleware = require("../middlewares/users/authMiddleware");
const router = express.Router();

router.post("/createEvents",createEvent,authMiddleware);
router.get("/viewEvents",getEvents);
router.post("/join/:eventId",joinEvent,authMiddleware);
router.post("/help-post/create",createHelpPost);

module.exports = router;