import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const RespondToBuyer = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const location = useLocation();
  const [item, setItem] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Extract buyerId from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const buyerId = queryParams.get('buyerId');

  useEffect(() => {
    const fetchItemAndMessages = async () => {
      try {
        const itemResponse = await axios.get(`http://localhost:5000/items/${id}`);
        console.log('Item data:', itemResponse.data); // Debugging line
        setItem(itemResponse.data);

        const messagesResponse = await axios.get(`http://localhost:5000/messages/item/${id}`);
        setMessages(messagesResponse.data);
      } catch (err) {
        console.error('Error fetching item or messages:', err.response?.data || err.message);
      }
    };

    fetchItemAndMessages();
  }, [id]);

  const handleMessageSend = async () => {
    try {
      // Ensure you have the correct sellerId (which is the userId of the item owner)
      const sellerId = item.userId;
      console.log('Seller ID:', sellerId); // Debugging line

      await axios.post('http://localhost:5000/messages', {
        content: newMessage,
        senderId: sellerId, // Seller is the sender
        receiverId: buyerId, // Buyer is the receiver
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
    <div className="respond-to-buyer container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">{item.name}</h2>
      <p className="text-blue-600 font-bold mt-2 text-center">Price: ${item.price}</p>

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
    </div>
  );
};

export default RespondToBuyer;