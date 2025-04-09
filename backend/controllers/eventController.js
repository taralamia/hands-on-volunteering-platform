// External imports

// internal imports
const Event = require("../../backend/models/eventModel");
const HelpPost = require('../../backend/models/helpPostModel');
const User = require("../../backend/models/User");

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
    let events = await Event.find(filter).populate("attendees", "name email");

    if (availability) {
      const minAvailableSlots = parseInt(availability);
      events = events.filter(event => event.availability >= minAvailableSlots);
    }


    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
  };
// Join event function (One-click registration)
async function joinEvent  (req, res)  {
    const { eventId } = req.params;
    const email = req.user.email;  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ message: 'Event not found' });
  
      if (event.attendees.includes(user._id)) {
        return res.status(400).json({ message: "You have already joined this event" });
      }
      if (event.attendees.length >= event.maxParticipants) {
        return res.status(400).json({ message: 'Event is already full' });
      }
    
      event.attendees.push(user._id);
      await event.save();
      res.status(200).json({ message: 'Successfully joined the event' });
    } catch (error) {
      console.log("Error",error);
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