import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PreferencesForm = () => {
  const [preferences, setPreferences] = useState({
    receiveNotifications: false,
    preferredDeliveryOption: 'standard'
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch user preferences from the backend
    const fetchPreferences = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/user/preferences', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPreferences(response.data);
      } catch (err) {
        console.error('Error fetching preferences:', err.response?.data || err.message);
        setMessage('Error fetching preferences.');
      }
    };

    fetchPreferences();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/user/preferences', preferences, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('Preferences updated successfully!');
    } catch (err) {
      console.error('Error updating preferences:', err.response?.data || err.message);
      setMessage('Error updating preferences.');
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Preferences</h3>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="receiveNotifications" className="flex items-center">
            <input
              type="checkbox"
              id="receiveNotifications"
              name="receiveNotifications"
              checked={preferences.receiveNotifications}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">Receive Notifications</span>
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="preferredDeliveryOption" className="block text-sm font-medium text-gray-700">
            Preferred Delivery Option
          </label>
          <select
            id="preferredDeliveryOption"
            name="preferredDeliveryOption"
            value={preferences.preferredDeliveryOption}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="standard">Standard Delivery</option>
            <option value="express">Express Delivery</option>
            <option value="same-day">Same Day Delivery</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Update Preferences
        </button>
      </form>
    </div>
  );
};

export default PreferencesForm;