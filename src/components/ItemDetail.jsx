import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetail = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  // Fetch messages for the item
useEffect(() => {
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/messages/item/${id}`);
      setMessages(response.data);
    } catch (err) {
      console.error('Error fetching messages:', err.response?.data || err.message);
    }
  };

  fetchMessages();
}, [id]);

// Send new message
const handleMessageSend = async () => {
  try {
    const buyerId = 1; // Replace with actual buyerId
    await axios.post('http://localhost:5000/messages', {
      content: newMessage,
      senderId: buyerId, // Buyer as the sender
      receiverId: item.userId, // Seller as the receiver
      itemId: id,
    });
    setNewMessage('');

    // Fetch updated messages
    const messagesResponse = await axios.get(`http://localhost:5000/messages/item/${id}`);
    setMessages(messagesResponse.data);
  } catch (err) {
    console.error('Error sending message:', err.response?.data || err.message);
  }
};

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

      <div className="messages mt-8">
        <h3 className="text-2xl font-bold mb-4">Messages</h3>
        <div className="message-list mb-4">
          {messages.map((message, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg mb-2">
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Write a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleMessageSend}
        >
          Send Message
        </button>
      </div>

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