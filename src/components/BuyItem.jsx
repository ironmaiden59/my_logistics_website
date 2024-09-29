import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';

const BuyItem = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { userId } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [sellingItems, setSellingItems] = useState([]);
  const [buyingItems, setBuyingItems] = useState([]);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:5000/users/items', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        // Extract sellingItems and interestedItems from response.data
        const { sellingItems, interestedItems } = response.data;
  
        // Update state variables
        setSellingItems(sellingItems);
        setBuyingItems(interestedItems);
      } catch (err) {
        console.error('Error fetching user items:', err.response?.data || err.message);
      }
    };
  
    fetchUserItems();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const authToken = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5000/items/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setSellingItems((prevItems) => prevItems.filter(item => item.id !== id));
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
        My Items
      </motion.h2>
  
      {/* Items I'm Selling */}
      <h3 className="text-2xl font-semibold mt-6">Items I'm Selling</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sellingItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <Link to={`/items/${item.id}`}>
              <h3 className="text-lg font-bold mb-2 text-gray-800">{item.name}</h3>
              <p className="text-teal-600 font-bold mt-2">${item.price}</p>
            </Link>
            {item.userId === userId && (
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
  
      {/* Items I'm Interested In */}
      <h3 className="text-2xl font-semibold mt-6">Items I'm Interested In</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {buyingItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <Link to={`/items/${item.id}`}>
              <h3 className="text-lg font-bold mb-2 text-gray-800">{item.name}</h3>
              <p className="text-teal-600 font-bold mt-2">${item.price}</p>
            </Link>
            {/* You can add actions specific to buying items here */}
          </motion.div>
        ))}
      </div>
    </div>
)};

export default BuyItem;