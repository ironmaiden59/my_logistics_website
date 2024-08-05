import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-5 px-6">
        <div className="logo">
          <h1 className="text-3xl font-bold text-blue-600">EasyTrade</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#hero" className="text-gray-800 hover:text-blue-600 transition-colors">
                Home
              </a>
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
            <li>
  <a href="/signup" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
    Sign Up
  </a>
</li>
<li>
  <a href="/login" className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
    Login
  </a>
</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;