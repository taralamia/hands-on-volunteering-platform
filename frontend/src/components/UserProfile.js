import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);  // State to hold the user data
  const navigate = useNavigate();

  // Fetch user profile data when component mounts
  useEffect(() => {
    // Function to fetch user profile
    const fetchUserProfile = async () => {
      try {
        // Full backend URL with /profile/edit
        const response = await axios.get("http://localhost:5000/auth/profile/edit", {
          withCredentials: true,  // Ensures cookies are sent along with the request
        });
        
        setUser(response.data);  // Set the user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    navigate("/profile/editButton");  // Redirect to the edit profile page
  };

  if (!user) {
    return <div>Loading...</div>;  // Show a loading message if user data is not available
  }

  return (
    <div>
      <h2>{user.firstName}'s Profile</h2>
      <p>Email: {user.email}</p>
      <p>Skills: {user.skills.length ? user.skills.join(", ") : "No skills added"}</p>
      <p>Causes Supported: {user.causesSupported.length ? user.causesSupported.join(", ") : "No causes added"}</p>
      <p>Volunteer History:{user.volunteerHistory.length ? user.volunteerHistory.join(", "): "No past volunteer history"}</p>
      
      <button onClick={handleEditProfile} className="btn btn-primary">
        Edit Profile
      </button>
    </div>
  );
};

export default UserProfile;
