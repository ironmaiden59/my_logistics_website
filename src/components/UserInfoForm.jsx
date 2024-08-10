import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfoForm = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch user information from the backend
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the stored token
        const response = await axios.get('http://localhost:5000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserInfo(response.data);
      } catch (err) {
        console.error('Error fetching user info:', err.response?.data || err.message);
        setMessage('Error fetching user information.');
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/user/profile', userInfo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err.message);
      setMessage('Error updating profile.');
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-gray-700 mb-4">User Information</h3>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            value={userInfo.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            value={userInfo.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address1"
            value={userInfo.address1}
            onChange={handleChange}
            placeholder="Address 1"
            className="block mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address2"
            value={userInfo.address2}
            onChange={handleChange}
            placeholder="Address 2"
            className="block mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="city"
            value={userInfo.city}
            onChange={handleChange}
            placeholder="City or Town"
            className="block mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="state"
            value={userInfo.state}
            onChange={handleChange}
            placeholder="State/Province"
            className="block mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="zipCode"
            value={userInfo.zipCode}
            onChange={handleChange}
            placeholder="Zip Code/Postal Code"
            className="block mb-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Update Information
        </button>
      </form>
    </div>
  );
};

export default UserInfoForm;