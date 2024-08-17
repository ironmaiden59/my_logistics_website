import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Update the authentication state
    navigate('/'); // Redirect to the home page
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-5 px-6">
        <div className="logo">
          <h1 className="text-3xl font-bold text-blue-600">EasyTrade</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-800 hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <a href="#features" className="text-gray-800 hover:text-blue-600 transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="text-gray-800 hover:text-blue-600 transition-colors">
                How It Works
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-800 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/dashboard" className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Seller Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors">
                    Product Management
                  </Link>
                </li>
                <li>
              <Link to="/buy-item" className="text-gray-800 hover:text-blue-600 transition-colors">
                Buy Items
              </Link>
            </li>
                <li>
                  <Link to="/profile" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;