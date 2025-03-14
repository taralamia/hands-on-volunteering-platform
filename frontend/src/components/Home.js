import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Welcome to My App</h2>
        <p className="text-center mb-6">Please sign up or log in to continue.</p>
        <div className="space-y-4">
          <button
            onClick={() => navigate("/signup")}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;