import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by looking for a token in local storage
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Convert token presence to a boolean
  }, []);

  // Function to log in the user (used in login or signup)
  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  // Define a logout function to clear authentication state
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};