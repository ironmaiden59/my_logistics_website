import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

const ItemDetail = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null); // Fetch the item here
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [socket, setSocket] = useState(null); // Socket.IO instance

  // Establish WebSocket connection on component mount
  useEffect(() => {
    const newSocket = io('http://localhost:5000'); // Connect to WebSocket server
    setSocket(newSocket);

    // Cleanup when the component unmounts
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    const fetchItemAndMessages = async () => {
      try {
        // Fetch item by ID
        const itemResponse = await axios.get(`http://localhost:5000/items/${id}`);
        setItem(itemResponse.data); // Store item in state

        // Fetch messages related to the item
        const messagesResponse = await axios.get(`http://localhost:5000/messages/item/${id}`);
        setMessages(messagesResponse.data);

        // Fetch JWT token from local storage (or wherever you're storing it)
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

        // Generate a tokenized link using JWT
        const linkResponse = await axios.get(`http://localhost:5000/items/${id}/generate-link`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT
          },
        });

        // Set the generated link in state
        setGeneratedLink(linkResponse.data.link);

      } catch (err) {
        console.error('Error fetching item or messages:', err.response?.data || err.message);
      }
    };

    fetchItemAndMessages();

    if (socket) {
      // Listen for new messages
      socket.on('newMessage', (message) => {
        if (message.itemId === id) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });

      // Cleanup the socket listener
      return () => {
        socket.off('newMessage');
      };
    }
  }, [id, socket]);

  // Send new message via WebSocket
  const handleMessageSend = () => {
    const buyerId = 1; // Replace with actual buyerId
    const messageData = {
      content: newMessage,
      senderId: buyerId, // Buyer as the sender
      receiverId: item.userId, // Seller as the receiver
      itemId: id,
    };

    // Emit the message via WebSocket
    socket.emit('sendMessage', messageData, (error) => {
      if (error) {
        console.error('Error sending message:', error);
      } else {
        // Message sent successfully
        setNewMessage(''); // Clear the input field
      }
    });
  };

  if (!item) {
    return <p>Loading...</p>;
  }

  // Calculate the fee and total
  const fee = parseFloat(item?.price) > 100 ? 15.99 : 0;
  const total = parseFloat(item?.price) + fee;

  return (
    <div className="item-detail container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">{item.name}</h2>
      <p className="text-blue-600 font-bold mt-2 text-center">Price: ${item.price}</p>

      {parseFloat(item.price) > 100 && (
        <p className="text-red-600 font-bold mt-2 text-center">
          Fee: ${fee} | Total: ${total.toFixed(2)}
        </p>
      )}

      {/* Message Box at Bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg">
        <div className="max-w-xl mx-auto p-4">
          <h3 className="text-xl font-semibold mb-4">Messages</h3>
          <div className="message-list h-48 overflow-y-auto bg-gray-100 p-3 rounded-lg">
            {messages.map((message, index) => (
              <div key={index} className="p-2 mb-2 bg-white rounded-lg shadow">
                <p>{message.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded mb-2"
              placeholder="Write a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>

            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              onClick={handleMessageSend}
            >
              Send Message
            </button>
          </div>
        </div>
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