import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="bg-gray-100 text-center py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">Welcome to EasyTrade</h2>
        <p className="text-lg mb-8">The hassle-free online marketplace where we handle delivery, so you can sit back and relax.</p>
        <a href="#signup" className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600">Join Our Marketplace</a>
      </div>
    </section>
  );
};

export default Hero;