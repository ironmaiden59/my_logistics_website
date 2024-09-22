import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      setUserId(decodedToken.userId);
    } else {
      setUserId(null);
    }
  }, [authToken]);

  // Function to log in the user (used in login or signup)
  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
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