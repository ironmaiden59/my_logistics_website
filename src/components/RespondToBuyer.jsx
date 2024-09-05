import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RespondToBuyer = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const location = useLocation();
  const navigate = useNavigate(); // For redirecting
  const [item, setItem] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);

  // Extract token from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  // Debugging: Log token to ensure it's being fetched correctly
  console.log('Token:', token);

  useEffect(() => {
    const validateTokenAndFetchItem = async () => {
      try {
        const response = await axios.post('http://localhost:5000/messages/validate-token', {
          token: token, // Send token in the request
        });

        if (response.data.valid) {
          setIsValidToken(true); // Mark token as valid
          setItem(response.data.item); // Set the item data
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

  const handleMessageSend = async () => {
    if (!item) {
      console.error('Item information is not available.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/messages', {
        content: newMessage,
        itemId: item.id,
        token, // Send the token along with the message
      });
      setNewMessage('');

      // Fetch updated messages
      const messagesResponse = await axios.get(`http://localhost:5000/messages/item/${id}`);
      setMessages(messagesResponse.data);
    } catch (err) {
      console.error('Error sending message:', err.response?.data || err.message);
    }
  };

  if (!isValidToken) {
    return <p>Loading...</p>; // Show loading or redirect to login
  }

  return (
    <div className="respond-to-buyer container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">{item?.name}</h2>
      <p className="text-blue-600 font-bold mt-2 text-center">Price: ${item?.price}</p>

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