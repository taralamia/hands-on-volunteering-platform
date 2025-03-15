import React, { useState } from "react";
import axios from "axios";

const VolunteerHistory = () => {
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [error, setError] = useState("");

  // Handle volunteer history change
  const handleVolunteerChange = (index, field, value) => {
    const updatedHistory = [...volunteerHistory];
    updatedHistory[index] = { ...updatedHistory[index], [field]: value };
    setVolunteerHistory(updatedHistory);
  };

  // Add new volunteer history entry
  const addVolunteerEntry = () => {
    setVolunteerHistory([
      ...volunteerHistory,
      { title: "", date: "", hoursContributed: "", role: "" },
    ]);
  };

  // Remove a volunteer entry
  const removeVolunteerEntry = (index) => {
    setVolunteerHistory(volunteerHistory.filter((_, i) => i !== index));
  };

  // Save volunteer history
  const handleSaveVolunteerHistory = async () => {
    try {
      await axios.put(
        "http://localhost:5000/auth/profile/editVolunteerHistory",
        { volunteerHistory },
        { withCredentials: true }
      );
      alert("Volunteer History updated successfully!");
    } catch (err) {
      console.error("Error updating volunteer history:", err);
      setError("Failed to update volunteer history.");
    }
  };

  return (
    <div className="volunteer-history-container">
      <h3>Volunteer History & Contributions</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {volunteerHistory.map((entry, index) => (
        <div key={index} className="volunteer-entry">
          <input
            type="text"
            value={entry.title}
            onChange={(e) => handleVolunteerChange(index, "title", e.target.value)}
            placeholder="Event Title"
          />
          <input
            type="date"
            value={entry.date ? entry.date.split("T")[0] : ""}
            onChange={(e) => handleVolunteerChange(index, "date", e.target.value)}
          />
          <input
            type="number"
            value={entry.hoursContributed}
            onChange={(e) => handleVolunteerChange(index, "hoursContributed", e.target.value)}
            placeholder="Hours"
          />
          <input
            type="text"
            value={entry.role}
            onChange={(e) => handleVolunteerChange(index, "role", e.target.value)}
            placeholder="Role (e.g., Organizer, Participant)"
          />
          <button type="button" onClick={() => removeVolunteerEntry(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={addVolunteerEntry}>
        + Add Entry
      </button>

      <button onClick={handleSaveVolunteerHistory} className="btn btn-primary">
        Save Volunteer History
      </button>
    </div>
  );
};

export default VolunteerHistory;
