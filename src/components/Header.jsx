import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="logo">
          <h1 className="text-2xl font-bold">EasyTrade</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#hero" className="hover:text-gray-400">Home</a></li>
            <li><a href="#features" className="hover:text-gray-400">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-gray-400">How It Works</a></li>
            <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
            <li><a href="#signup" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Sign Up</a></li>
            <li><a href="#login" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Login</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;