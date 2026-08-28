import axios from 'axios';

// Base URL of the backend API.
// For production, set REACT_APP_API_URL in Vercel.
const API_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the JWT token (if the user is logged in)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ks_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Helper to extract a friendly error message from an Axios error
export const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  'Something went wrong. Please try again.';

export default api;
