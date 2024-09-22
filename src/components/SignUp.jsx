import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null); // State for handling errors
  const { login } = useContext(AuthContext); // Access login function from AuthContext
  const navigate = useNavigate(); // Use navigate for redirection
  const location = useLocation(); // To get the current location

  // Extract the redirect query parameter
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get('redirect') || '/'; // Default to home if no redirect is provided

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the signup endpoint
      const response = await axios.post('http://localhost:5000/signup', formData);

      // Get the authToken from the response
      const { authToken } = response.data;

      // Store the authentication token in localStorage
      localStorage.setItem('authToken', authToken);

      // Decode the token to get userId
      const decodedToken = jwtDecode(authToken);
      const userId = decodedToken.userId;

      // Update the authentication state
      login({ userId }); // This will update the isAuthenticated state in the AuthContext

      // Show a success message (optional)
      alert('Sign-up successful!');

      // Redirect to the originally intended page
      navigate(redirect);

    } catch (err) {
      console.error('Error signing up:', err.response?.data || err.message);
      // Set an error message
      setError(err.response?.data?.message || 'An error occurred during sign-up.');
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
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
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
            Sign Up
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-teal-600 hover:underline">
            Log In
            </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;