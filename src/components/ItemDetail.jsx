import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetail = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null);
  const [generatedLink, setGeneratedLink] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${id}`);
        setItem(response.data);
        
        // Generate a unique link for the seller
        setGeneratedLink(`http://localhost:3000/respond-to-buyer/${id}`);
      } catch (err) {
        console.error('Error fetching item:', err.response?.data || err.message);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div className="item-detail container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">{item.name}</h2>
      <p className="text-blue-600 font-bold mt-2 text-center">${item.price}</p>

      {parseFloat(item.price) > 100 && (
        <p className="text-red-600 font-bold mt-2 text-center">
          Fee: $15.99 | Total: ${(parseFloat(item.price) + 15.99).toFixed(2)}
        </p>
      )}

      <div className="mt-8 text-center">
        <p>Copy and send this link to the seller:</p>
        <input
          type="text"
          value={generatedLink}
          readOnly
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-center"
        />
      </div>
    </div>
  );
};

export default ItemDetail;