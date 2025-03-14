// src/api.js
import axios from 'axios';

// Create an axios instance for centralized configuration
const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your back end URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example of a SignUp API call
export const signUp = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

// Example of a Login API call
export const login = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Example of updating the User Profile
export const updateUserProfile = async (token, userId, profileData) => {
    try {
      const response = await api.put(`/auth/profile/${userId}`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
      });
      return response.data; // Returning updated profile data from the response
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error; // Rethrowing the error to be handled by the caller
    }
  };
  