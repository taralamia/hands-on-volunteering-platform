import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null); // State to hold the user data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/profile/edit",
          {
            withCredentials: true, // Ensures cookies are sent along with the request
          }
        );

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    navigate("/profile/editButton");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.firstName}'s Profile</h2>
      <p>Email: {user.email}</p>
      <p>
        Skills:{" "}
        {user.skills.length ? user.skills.join(", ") : "No skills added"}
      </p>
      <p>
        Causes Supported:{" "}
        {user.causesSupported.length
          ? user.causesSupported.join(", ")
          : "No causes added"}
      </p>

      <h3>Volunteer History and Contributions:</h3>
      {user.volunteerHistory && user.volunteerHistory.length > 0 ? (
        <ul>
          {user.volunteerHistory.map((entry, index) => (
            <li key={index}>
              <strong>{entry.title}</strong> - {entry.date} -{" "}
              {entry.hoursContributed} hours - <em>{entry.role}</em>
            </li>
          ))}
        </ul>
      ) : (
        <p>No past volunteer history and contributions</p>
      )}

      <button onClick={handleEditProfile} className="btn btn-primary">
        Edit Profile
      </button>
    </div>
  );
};

export default UserProfile;
