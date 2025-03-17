// External imports

// internal imports
const Event = require("../models/eventModel");
const HelpPost = require('../models/helpPostModel');

// Event creation
async function createEvent  (req, res) {
  console.log("Request Body",req.body);
    const { title, description, date, time, location, category,maxParticipants } = req.body;
    try {
      const newEvent = new Event({ title, description, date, time, location, category,maxParticipants });
      await newEvent.save();
      res.status(201).json(newEvent);
    } catch (error) {
      console.error("Error saving event to database:", error); 
      res.status(500).json({ message: 'Error creating event', error });
    }
  };
// Fetch events with filters
async function getEvents  (req, res)  {
  try {
    const { category, location, availability } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (location) filter.location = location;
    if (availability) {
      filter.maxParticipants = { $gte: parseInt(availability) };
    }

    const events = await Event.find(filter).populate("registeredUsers", "name email");

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
  };
// Join event function (One-click registration)
async function joinEvent  (req, res)  {
    const { eventId } = req.params;
    const userId = req.user._id;  // Assuming the user is authenticated and the ID is accessible
  
    try {
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ message: 'Event not found' });
  
      if (event.attendees.includes(userId)) {
        return res.status(400).json({ message: 'Already joined the event' });
      }
  
      event.attendees.push(userId);
      await event.save();
      res.status(200).json({ message: 'Successfully joined the event' });
    } catch (error) {
      res.status(500).json({ message: 'Error joining event', error });
    }
  };
  // Create community help post
async function createHelpPost (req, res) {
    const { title, description, location, category, contactInfo } = req.body;
    try {
      const newHelpPost = new HelpPost({ title, description, location, category, contactInfo });
      await newHelpPost.save();
      res.status(201).json(newHelpPost);
    } catch (error) {
      res.status(500).json({ message: 'Error creating help post', error });
    }
  };
module.exports ={
    createEvent,
    getEvents,
    joinEvent,
    createHelpPost  
  };  