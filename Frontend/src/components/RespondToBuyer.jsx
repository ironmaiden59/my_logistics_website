import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';

const RespondToBuyer = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const location = useLocation(); // Get the location object
  const navigate = useNavigate();
  const [item, setItem] = useState(null); // Fetch the item here
  const [sellerFirstName, setSellerFirstName] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [buyerId, setBuyerId] = useState(null);
  const [isValidToken, setIsValidToken] = useState(false);
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null); // Initialize userId state

  // Extract token from the query parameters
  const queryParams = new URLSearchParams(location.search); // Use location.search
  const token = queryParams.get('token');
  const messageListRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = useCallback(async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const messagesResponse = await axios.get(`http://localhost:4000/messages/item/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMessages(messagesResponse.data);
    } catch (err) {
      console.error('Error fetching messages:', err.response?.data || err.message);
    }
  }, [id]);

  const associateItemWithUser = useCallback(async (itemId) => {
    try {
      const authToken = localStorage.getItem('authToken');
      await axios.post(
        'http://localhost:4000/users/associate-item',
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (err) {
      console.error('Error associating item with user:', err.response?.data || err.message);
    }
  }, []);

  // Check authentication and get userId
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error('Invalid auth token:', error);
        localStorage.removeItem('authToken');
        setUserId(null);
        navigate(
          `/login?redirect=${encodeURIComponent(`/respond-to-buyer/${id}?token=${token}`)}`
        );
      }
    } else {
      navigate(
        `/login?redirect=${encodeURIComponent(`/respond-to-buyer/${id}?token=${token}`)}`
      );
    }
  }, [navigate, id, token]);

  // Fetch seller's first name
  useEffect(() => {
    const fetchSellerFirstName = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:4000/user/profile', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setSellerFirstName(response.data.firstName || 'Seller');
      } catch (err) {
        console.error('Error fetching user info:', err.response?.data || err.message);
      }
    };

    fetchSellerFirstName();
  }, []);

  // Initialize WebSocket connection
  useEffect(() => {
    const newSocket = io('http://localhost:4000'); // Connect to WebSocket server
    setSocket(newSocket);

    // Cleanup when the component unmounts
    return () => newSocket.close();
  }, []);

  // Fetch item and validate token on component mount
  useEffect(() => {
    const validateTokenAndFetchItem = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.post('http://localhost:4000/messages/validate-token', {
          token: token,
        }, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        if (response.data.valid) {
          setIsValidToken(true);
          setItem(response.data.item);
          setBuyerId(response.data.buyerId);
  
          // Associate the item with the user
          await associateItemWithUser(response.data.item.id);
  
          fetchMessages(); // Fetch messages after token validation
        } else {
          console.error('Invalid token');
        }
      } catch (error) {
        console.error('Error validating token:', error);
      }
    };
  
    if (id && token) {
      validateTokenAndFetchItem();
    }
  }, [id, token, fetchMessages, associateItemWithUser]);

  // Set up socket listeners
  useEffect(() => {
    if (socket && id) {
      socket.emit('joinItemRoom', id);

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
    if (!newMessage.trim() || !buyerId) {
      return;
    }
  
    const messageData = {
      content: newMessage,
      senderName: sellerFirstName || 'Seller', // Use the seller's first name
      senderId: userId,   // Seller's userId
      receiverId: buyerId, // Buyer's userId obtained from the token
      itemId: id,
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

  if (!isValidToken || buyerId === null || !item) {
    return <p>Loading...</p>; // Show loading or handle invalid token
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
                  <p>
                    <strong>{message.senderName}:</strong> {message.content}
                  </p>
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

export default RespondToBuyer;