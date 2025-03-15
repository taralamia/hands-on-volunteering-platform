import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import VerifyEmail from "./components/VerifyEmail";
import Login  from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import VolunteerHistory from "./components/VolunteerHistory";
function App() {
  return (
    <Router> {/* ✅ Wrap everything inside BrowserRouter */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/edit" element={<UserProfile />} />
        <Route path="/profile/editButton" element={<EditProfile />} />
        <Route path="/profile/volunteer-history" element={<VolunteerHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
