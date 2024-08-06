import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for a valid token in local storage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Convert token presence to a boolean
  }, []);

  // Define a login function to update authentication state
  const login = () => {
    setIsAuthenticated(true);
  };

  // Define a logout function to clear authentication state
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};