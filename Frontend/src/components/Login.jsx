import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const location = useLocation();
  const [error, setError] = useState(null); // State for handling errors
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation

  // Extract redirect parameter
const queryParams = new URLSearchParams(location.search);
const redirectPath = queryParams.get('redirect') || '/profile'; // Default to '/profile' if not specified

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the login endpoint
      const response = await axios.post('http://localhost:4000/login', formData);

      // Get the authToken from the response
      const { authToken } = response.data;

      // Store the JWT token in local storage
      localStorage.setItem('authToken', authToken);

      // Decode the token to get userId
      const decodedToken = jwtDecode(authToken);
      const userId = decodedToken.userId;

      // Update the authentication state
      login(authToken);

      // Optionally navigate to the profile page or another page
      navigate(redirectPath);

      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error logging in:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-600 transition-colors"
          >
            Login
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href={`/signup?redirect=${encodeURIComponent(redirectPath)}`}
    className="text-teal-600 hover:underline">
            Sign Up
            </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;