import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    console.log('AuthToken from localStorage:', authToken);
    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error('Invalid token:', error);
        // Handle invalid token: remove it and reset state
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUserId(null);
      }
    } else {
      setUserId(null);
    }
  }, [authToken]);

  // Function to log in the user (used in login or signup)
  const login = (authToken) => {
    localStorage.setItem('authToken', authToken);
    setAuthToken(authToken);
  };

  // Define a logout function to clear authentication state
  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};