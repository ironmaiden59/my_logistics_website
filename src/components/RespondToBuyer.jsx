import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RespondToBuyer = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const location = useLocation();
  const navigate = useNavigate(); // For redirecting
  const [item, setItem] = useState(null);
  const [senderName, setSenderName] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);

  // Extract token from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  // Fetch item and validate token on component mount
  useEffect(() => {
    const validateTokenAndFetchItem = async () => {
      try {
        const response = await axios.post('http://localhost:5000/messages/validate-token', {
          token: token, // Send token in the request
        });

        if (response.data.valid) {
          setIsValidToken(true); // Mark token as valid
          setItem(response.data.item); // Set the item data
          fetchMessages(); // Fetch messages after token validation
        } else {
          navigate('/login'); // Navigate to login page if token is invalid
        }
      } catch (error) {
        console.error('Error validating token:', error);
        navigate('/error'); // Navigate to error page if token validation fails
      }
    };
    validateTokenAndFetchItem();
  }, [token, navigate]);

  // Fetch messages related to the item
  const fetchMessages = async () => {
    try {
      const messagesResponse = await axios.get(`http://localhost:5000/messages/item/${id}`);
      setMessages(messagesResponse.data);
    } catch (err) {
      console.error('Error fetching messages:', err.response?.data || err.message);
    }
  };

  const handleMessageSend = async () => {
    if (!item) {
      console.error('Item information is not available.');
      return;
    }

    const buyerId = 1; // Assuming buyerId is 1 (replace with actual buyer ID)

    try {
      await axios.post('http://localhost:5000/messages', {
        content: newMessage,
        itemId: item.id,
        senderName: senderName || 'Anonymous', // Default to 'Anonymous' if no name is provided
        senderId: buyerId, // Provide senderId (the buyer)
        receiverId: item.userId, // Provide receiverId (the seller's userId)
        token, // Send the token along with the message
      });

      // Clear the message input
      setNewMessage('');

      // Re-fetch updated messages
      fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err.response?.data || err.message);
    }
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

      {/* Show the fee and total if price is greater than 100 */}
      {parseFloat(item?.price) > 100 && (
        <p className="text-red-600 font-bold mt-2 text-center">
          Fee: ${fee} | Total: ${total.toFixed(2)}
        </p>
      )}

      <div className="messages mt-8">
        <h3 className="text-2xl font-bold mb-4">Messages</h3>
        <div className="message-list mb-4">
          {messages.map((message, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg mb-2">
              <p><strong>{message.senderName}:</strong> {message.content}</p>
            </div>
          ))}
        </div>

        {/* Input for seller's name */}
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Enter your name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
        ></textarea>

        {/* Input for message */}
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