// external imports
const express = require('express');
// internal imports
const Event = require("../../backend/models/eventModel");
const { 
  createEvent,
  getEvents,
  joinEvent,
  createHelpPost 
  } = require("../../backend/controllers/eventController");
const authMiddleware = require("../../backend/middlewares/users/authMiddleware");
const router = express.Router();

router.post("/createEvents",createEvent,authMiddleware);
router.get("/viewEvents",getEvents);
router.post("/join/:eventId",authMiddleware,joinEvent);
router.post("/help-post/create",createHelpPost);

module.exports = router;