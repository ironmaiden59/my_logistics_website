import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

const RespondToBuyer = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const location = useLocation(); // Get the location object
  const [item, setItem] = useState(null); // Fetch the item here
  const [senderName, setSenderName] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);
  const [socket, setSocket] = useState(null);

  // Extract token from the query parameters
  const queryParams = new URLSearchParams(location.search); // Use location.search
  const token = queryParams.get('token');

  // Initialize WebSocket connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000'); // Connect to WebSocket server
    setSocket(newSocket);

    // Cleanup when the component unmounts
    return () => newSocket.close();
  }, []);

  // Fetch item and validate token on component mount
  useEffect(() => {
    const validateTokenAndFetchItem = async () => {
      try {
        const response = await axios.post('http://localhost:5000/messages/validate-token', {
          token: token, // Send the token extracted from the URL
        });

        if (response.data.valid) {
          setIsValidToken(true); // Mark token as valid
          setItem(response.data.item); // Set the item data
          fetchMessages(); // Fetch messages after token validation
        } else {
          console.error('Invalid token');
        }
      } catch (error) {
        console.error('Error validating token:', error);
      }
    };

    if (id) {
      validateTokenAndFetchItem();
    }

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
  }, [id, socket, token]); // Include the socket, id, and token in the dependency array

  // Fetch messages related to the item
  const fetchMessages = async () => {
    try {
      const messagesResponse = await axios.get(`http://localhost:5000/messages/item/${id}`);
      setMessages(messagesResponse.data);
    } catch (err) {
      console.error('Error fetching messages:', err.response?.data || err.message);
    }
  };

  // Send new message via WebSocket
  const handleMessageSend = () => {
    if (!newMessage.trim()) {
      return; // Do not send an empty message
    }

    const buyerId = 1; // Replace with actual buyerId
    const messageData = {
      content: newMessage,
      senderName: senderName || 'Anonymous', // Provide senderName
      senderId: buyerId,
      receiverId: item?.userId, // Use the seller's userId
      itemId: id,
    };

    // Clear the message input before emitting
    setNewMessage('');

    // Emit the message via WebSocket
    socket.emit('sendMessage', messageData, (error) => {
      if (error) {
        console.error('Error sending message:', error);
      }
    });
  };

  if (!isValidToken) {
    return <p>Loading...</p>; // Show loading or redirect to login
  }

  // Calculate the fee and total
  const fee = parseFloat(item?.price) > 100 ? 15.99 : 0;
  const total = parseFloat(item?.price) + fee;

  return (
    <div className="respond-to-buyer container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">{item?.name}</h2>
      <p className="text-blue-600 font-bold mt-2 text-center">Price: ${item?.price}</p>

      {parseFloat(item?.price) > 100 && (
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
                <p><strong>{message.senderName}:</strong> {message.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter your name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />

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
    </div>
  );
};

export default RespondToBuyer;