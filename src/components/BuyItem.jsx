import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

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
      <motion.h2
        className="text-3xl font-bold mb-6 text-center text-teal-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Buy Items
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <Link to={`/items/${item.id}`}>
              <h3 className="text-lg font-bold mb-2 text-gray-800">{item.name}</h3>
              <p className="text-teal-600 font-bold mt-2">${item.price}</p>
            </Link>
            {item.id && (
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BuyItem;