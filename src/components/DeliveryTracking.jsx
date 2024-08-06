import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeliveryTracking = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/deliveries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeliveries(response.data);
    } catch (err) {
      console.error('Error fetching deliveries:', err.response?.data || err.message);
    }
  };

  return (
    <div className="delivery-tracking">
      <h2 className="text-2xl font-bold mb-4">Delivery Tracking</h2>
      <ul className="delivery-list">
        {deliveries.map((delivery, index) => (
          <li key={index} className="mb-4 p-4 border border-gray-300 rounded">
            <p>Product: {delivery.productName}</p>
            <p>Status: {delivery.status}</p>
            <p>Estimated Delivery: {new Date(delivery.estimatedDelivery).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryTracking;