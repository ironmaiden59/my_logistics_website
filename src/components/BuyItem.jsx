import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BuyItem = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      setItems((prevItems) => prevItems.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting item:', err.response?.data || err.message);
    }
  };

  return (
    <div className="buy-item container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Buy Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <Link to={`/items/${item.id}`}>
              <h3 className="text-lg font-bold mb-2 text-gray-800">{item.name}</h3>
              <p className="text-blue-600 font-bold mt-2">${item.price}</p>
            </Link>
            {item.id && (
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyItem;