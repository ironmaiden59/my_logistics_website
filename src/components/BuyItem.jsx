import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BuyItem = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the backend
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/items');
        setItems(response.data);
      } catch (err) {
        console.error('Error fetching items:', err.response?.data || err.message);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="buy-item container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Buy Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2 text-gray-800">{item.name}</h3>
            <p className="text-blue-600 font-bold mt-2">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyItem;