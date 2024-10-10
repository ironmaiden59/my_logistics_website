import React, { useState, useEffect, useRef } from 'react';
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
  const [buyerId, setBuyerId] = useState(null);

  const messageListRef = useRef(null);
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

 // Authentication and buyerId setup
 useEffect(() => {
  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    try {
      const decodedToken = jwtDecode(authToken);
      setBuyerId(decodedToken.userId);
    } catch (error) {
      console.error('Invalid auth token:', error);
      localStorage.removeItem('authToken');
      setBuyerId(null);
      navigate('/login');
    }
  } else {
    navigate('/login');
  }
}, [navigate]);

// Establish WebSocket connection on component mount
useEffect(() => {
  const newSocket = io('http://localhost:5000');
  setSocket(newSocket);

  // Emit joinItemRoom event
  newSocket.emit('joinItemRoom', id);

  // Cleanup when the component unmounts
  return () => newSocket.close();
}, [id]);

// Fetch item and messages
useEffect(() => {
  const fetchItemAndMessages = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      // Fetch item by ID
      const itemResponse = await axios.get(`http://localhost:5000/items/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setItem(itemResponse.data);

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
          Authorization: `Bearer ${authToken}`,
        },
      });
      setGeneratedLink(linkResponse.data.link);

    } catch (err) {
      console.error('Error fetching item or messages:', err.response?.data || err.message);
    }
  };

  fetchItemAndMessages();
}, [id]);

// Set up socket listeners
useEffect(() => {
  if (socket && id) {
    const handleNewMessage = (message) => {
      if (message.itemId.toString() === id.toString()) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }
}, [socket, id]);

// Send new message via WebSocket
const handleMessageSend = () => {
  if (!newMessage.trim() || !buyerId || !item || !item.userId) {
    console.error('Cannot send message: Missing data');
    return;
  }

  const messageData = {
    content: newMessage,
    senderId: buyerId, // Buyer's userId
    receiverId: item.userId, // Seller's userId
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
      <div className="flex flex-col lg:flex-row">
        {/* Left Column - Item Details */}
        <div className="w-full lg:w-2/3 pr-0 lg:pr-4">
          <h2 className="text-3xl font-bold mb-6 text-teal-600">{item.name}</h2>
          <p className="text-teal-600 font-bold mt-2">Price: ${item.price}</p>
  
          {parseFloat(item.price) > 100 && (
            <p className="text-red-600 font-bold mt-2">
              Fee: ${fee} | Total: ${total.toFixed(2)}
            </p>
          )}
  
          {/* Generated Link */}
          <div className="mt-8">
            <p className="text-gray-700">Copy and send this link to the seller:</p>
            <input
              type="text"
              value={generatedLink}
              readOnly
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-center focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>
  
        {/* Right Column - Messaging */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white shadow-lg p-4">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Messages</h3>
            <div
              className="message-list h-96 overflow-y-auto bg-gray-100 p-3 rounded-lg"
              ref={messageListRef}
            >
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
      </div>
    </div>
  );
};

export default ItemDetail;