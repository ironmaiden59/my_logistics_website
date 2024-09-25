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
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserInfo({
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          email: response.data.email || '',
          address1: response.data.address1 || '',
          address2: response.data.address2 || '',
          city: response.data.city || '',
          state: response.data.state || '',
          zipCode: response.data.zipCode || '',
        });
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
      const token = localStorage.getItem('authToken');
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
      {message && <p className={`text-center mt-2 ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Input Fields */}
        {[
          { label: 'First Name', name: 'firstName', type: 'text' },
          { label: 'Last Name', name: 'lastName', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Address 1', name: 'address1', type: 'text' },
          { label: 'Address 2', name: 'address2', type: 'text' },
          { label: 'City or Town', name: 'city', type: 'text' },
          { label: 'State/Province', name: 'state', type: 'text' },
          { label: 'Zip Code/Postal Code', name: 'zipCode', type: 'text' },
        ].map((field, index) => (
          <div className="mb-4" key={index}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={userInfo[field.name]}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-600 transition-colors"
        >
          Update Information
        </button>
      </form>
    </div>
  );
};

export default UserInfoForm;