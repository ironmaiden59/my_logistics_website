import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';

const ItemDetail = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const navigate = useNavigate();
  const [item, setItem] = useState(null); // Fetch the item here
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [socket, setSocket] = useState(null); // Socket.IO instance

// Initialize buyerId
let buyerId = null;
const authToken = localStorage.getItem('authToken');
if (authToken) {
  const decodedToken = jwtDecode(authToken);
  buyerId = decodedToken.userId;
}

// Redirect to login if not authenticated
useEffect(() => {
  if (!authToken) {
    navigate('/login');
  }
}, [authToken, navigate]);

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
      const itemResponse = await axios.get(`http://localhost:5000/items/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setItem(itemResponse.data); // Store item in state

      // Fetch messages related to the item
      const messagesResponse = await axios.get(`http://localhost:5000/messages/item/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMessages(messagesResponse.data);

      // Generate a tokenized link using JWT
      const linkResponse = await axios.get(`http://localhost:5000/items/${id}/generate-link`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the JWT
        },
      });

      // Set the generated link in state
      setGeneratedLink(linkResponse.data.link);

    } catch (err) {
      console.error('Error fetching item or messages:', err.response?.data || err.message);
    }
  };

  fetchItemAndMessages();

  let socketCleanup;
  if (socket) {
    // Listen for new messages
    socket.on('newMessage', (message) => {
      if (message.itemId === id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // Prepare the cleanup function
    socketCleanup = () => {
      socket.off('newMessage');
    };
  }

  // Return the cleanup function
  return () => {
    if (socketCleanup) socketCleanup();
  };
}, [id, socket, authToken]);

// Send new message via WebSocket
const handleMessageSend = () => {
  if (!newMessage.trim() || !buyerId) {
    return;
  }

  const messageData = {
    content: newMessage,
    senderId: buyerId, // For buyer
    receiverId: item.userId, // For seller
    itemId: id,
    senderName: 'Buyer Name', // Or fetch from user data
  };

  setNewMessage('');

  if (socket) {
    socket.emit('sendMessage', messageData, (error) => {
      if (error) {
        console.error('Error sending message:', error);
      }
    });
  } else {
    console.error('WebSocket connection not established');
  }
};

  if (!item) {
    return <p>Loading...</p>;
  }

  // Calculate the fee and total
  const fee = parseFloat(item?.price) > 100 ? 15.99 : 0;
  const total = parseFloat(item?.price) + fee;

  return (
    <div className="item-detail container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">{item.name}</h2>
      <p className="text-teal-600 font-bold mt-2 text-center">Price: ${item.price}</p>

      {parseFloat(item.price) > 100 && (
        <p className="text-red-600 font-bold mt-2 text-center">
          Fee: ${fee} | Total: ${total.toFixed(2)}
        </p>
      )}

      {/* Message Box at Bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg">
        <div className="max-w-xl mx-auto p-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Messages</h3>
          <div className="message-list h-48 overflow-y-auto bg-gray-100 p-3 rounded-lg">
            {messages.map((message, index) => (
              <div key={index} className="p-2 mb-2 bg-white rounded-lg shadow">
                <p>{message.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 mb-2"
              placeholder="Write a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>

            <button
              className="w-full bg-teal-500 text-white py-2 rounded-full hover:bg-teal-600 transition-colors"
              onClick={handleMessageSend}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-700">Copy and send this link to the seller:</p>
        <input
          type="text"
          value={generatedLink}
          readOnly
          className="w-full max-w-xl mx-auto p-3 mt-2 border border-gray-300 rounded-lg text-center focus:ring-teal-500 focus:border-teal-500"
        />
      </div>
    </div>
  );
};

export default ItemDetail;