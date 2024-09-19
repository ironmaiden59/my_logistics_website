import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext
import { motion } from 'framer-motion';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Update the authentication state
    navigate('/'); // Redirect to the home page
  };

   // Animation variants
   const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-5 px-6">
        <div className="logo">
          <Link to="/">
            <h1 className="text-3xl font-bold text-teal-600">EasyTrade</h1>
          </Link>
        </div>
        <nav>
          <motion.ul
            className="flex space-x-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {isAuthenticated ? (
              <>
                <motion.li variants={navItemVariants}>
                  <Link
                    to="/buy-item"
                    className="text-gray-800 hover:text-teal-600 transition-colors"
                  >
                    Buy Items
                  </Link>
                </motion.li>
                <motion.li variants={navItemVariants}>
                  <Link
                    to="/profile"
                    className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 transition-colors"
                  >
                    Profile
                  </Link>
                </motion.li>
                <motion.li variants={navItemVariants}>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Logout
                  </button>
                </motion.li>
              </>
            ) : (
              <>
                <motion.li variants={navItemVariants}>
                  <Link
                    to="/signup"
                    className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 transition-colors"
                  >
                    Sign Up
                  </Link>
                </motion.li>
                <motion.li variants={navItemVariants}>
                  <Link
                    to="/login"
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Login
                  </Link>
                </motion.li>
              </>
            )}
          </motion.ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;