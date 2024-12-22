import React, { useState } from 'react';
import axios from 'axios';

const PasswordManagement = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:4000/user/password', {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('Password updated successfully!');
    } catch (err) {
      console.error('Error updating password:', err.response?.data || err.message);
      setMessage('Error updating password.');
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Password Management</h3>
      {message && <p className={`text-center mt-2 ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Password Fields */}
        {[
          { label: 'Current Password', name: 'currentPassword' },
          { label: 'New Password', name: 'newPassword' },
          { label: 'Confirm New Password', name: 'confirmPassword' },
        ].map((field, index) => (
          <div className="mb-4" key={index}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type="password"
              id={field.name}
              name={field.name}
              value={passwords[field.name]}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-600 transition-colors"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default PasswordManagement;