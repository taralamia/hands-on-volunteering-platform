import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./components/EditProfile";
import VolunteerHistory from "./components/VolunteerHistory";
import EventPage from "./pages/EventPage";
import CreateEvent from "./pages/CreateEvent";
function App() {
  return (
    <Router>
      {" "}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/edit" element={<UserProfile />} />
        <Route path="/profile/editButton" element={<EditProfile />} />
        <Route path="/event/eventPage" element={<EventPage />} />
        <Route path="/event/createEvents" element={<CreateEvent />} />
        <Route
          path="/profile/volunteer-history"
          element={<VolunteerHistory />}
        />
      </Routes>
    </Router>
  );
}

export default App;
