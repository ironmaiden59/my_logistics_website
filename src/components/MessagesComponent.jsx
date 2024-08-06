import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessagesComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data);
    } catch (err) {
      console.error('Error fetching messages:', err.response?.data || err.message);
    }
  };

  return (
    <div className="messages-component">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      <ul className="message-list">
        {messages.map((message, index) => (
          <li key={index} className="mb-4 p-4 border border-gray-300 rounded">
            <p><strong>From:</strong> {message.senderName}</p>
            <p><strong>Message:</strong> {message.content}</p>
            <p><strong>Date:</strong> {new Date(message.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesComponent;