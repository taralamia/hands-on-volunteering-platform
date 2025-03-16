import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const [skills, setSkills] = useState("");
  const [causesSupported, setCausesSupported] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch the current profile details (but keep input fields blank)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await axios.get("http://localhost:5000/auth/profile/edit", {
          withCredentials: true,
        });

        // Keep input fields blank even after fetching
        setSkills("");
        setCausesSupported("");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const handleSaveSkillsCauses = async () => {
    try {
      const skillsArray = skills.split(",").map((skill) => skill.trim());
      const causesSupportedArray = causesSupported
        .split(",")
        .map((cause) => cause.trim());

      await axios.put(
        "http://localhost:5000/auth/profile/editButton",
        { skills: skillsArray, causesSupported: causesSupportedArray },
        { withCredentials: true }
      );
      alert("Skills & Causes updated successfully!");
      navigate("/profile/edit");
    } catch (err) {
      console.error("Error updating skills & causes:", err);
      setError("Failed to update skills & causes.");
    }
  };
  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Skills & Causes */}
          <label>Skills:</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Enter skills separated by commas"
          />

          <label>Causes Supported:</label>
          <input
            type="text"
            value={causesSupported}
            onChange={(e) => setCausesSupported(e.target.value)}
            placeholder="Enter causes separated by commas"
          />

          <button onClick={handleSaveSkillsCauses} className="btn btn-primary">
            Save Skills & Causes
          </button>
        </>
      )}
    </div>
  );
};

export default EditProfile;
