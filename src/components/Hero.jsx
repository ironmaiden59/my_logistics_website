import React from 'react';

const Hero = () => {
  return (
    <section
      id="hero"
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-24"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-4">Welcome to EasyTrade</h2>
        <p className="text-lg mb-8">
          The hassle-free online marketplace where we handle delivery, so you
          can sit back and relax.
        </p>
        <a
          href="#signup"
          className="bg-white text-blue-600 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Join Our Marketplace
        </a>
      </div>
    </section>
  );
};

export default Hero;