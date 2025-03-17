import React, { useState } from "react";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    maxParticipants: "", // Add maxParticipants
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/event/createEvents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Event created successfully!");
        setEventData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          category: "",
          maxParticipants: "", // Reset maxParticipants
        });
      } else {
        setMessage(data.message || "Error creating event.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to create event.");
    }
  };

  return (
    <div>
      <h2>Create a New Event</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={eventData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={eventData.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={eventData.time}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Event Location"
          value={eventData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Event Category"
          value={eventData.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="maxParticipants"
          placeholder="Max Participants"
          value={eventData.maxParticipants}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
