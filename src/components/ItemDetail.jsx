import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetail = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${id}`);
        setItem(response.data);
      } catch (err) {
        console.error('Error fetching item:', err.response?.data || err.message);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return <p>Loading...</p>;
  }

  const calculateTotal = (price) => {
    const itemPrice = parseFloat(price);
    const fee = itemPrice > 100 ? 15.99 : 0;
    return itemPrice + fee;
  };

  return (
    <div className="item-detail container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">{item.name}</h2>
      <p className="text-blue-600 font-bold mt-2 text-center">Price: ${item.price}</p>
      {parseFloat(item.price) > 100 && (
        <p className="text-red-600 font-bold mt-2 text-center">
          Fee: $15.99 | Total: ${calculateTotal(item.price).toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default ItemDetail;