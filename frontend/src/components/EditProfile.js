import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const [skills, setSkills] = useState([]);
  const [causesSupported, setCausesSupported] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch the current profile details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/profile/edit", {
          withCredentials: true,
        });

        setSkills(response.data.skills || []);
        setCausesSupported(response.data.causesSupported || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile data.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/auth/profile/editButton",
        { skills, causesSupported },
        { withCredentials: true }
      );

      alert("Profile updated successfully!");
      navigate("/profile/edit"); // Redirect to profile page
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <label>Skills:</label>
          <input
            type="text"
            value={skills.join(", ")}
            onChange={(e) => setSkills(e.target.value.split(",").map((s) => s.trim()))}
            placeholder="Enter skills separated by commas"
          />

          <label>Causes Supported:</label>
          <input
            type="text"
            value={causesSupported.join(", ")}
            onChange={(e) => setCausesSupported(e.target.value.split(",").map((c) => c.trim()))}
            placeholder="Enter causes separated by commas"
          />

          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
