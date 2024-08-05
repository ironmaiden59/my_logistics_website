import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <ol className="flex flex-wrap justify-between gap-4">
          <li className="relative bg-white p-6 rounded shadow-lg text-center w-full md:w-1/4">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white w-12 h-12 rounded-full flex justify-center items-center font-bold">
              1
            </div>
            <p><strong>Browse or List:</strong> Find great deals or list items you want to sell.</p>
          </li>
          <li className="relative bg-white p-6 rounded shadow-lg text-center w-full md:w-1/4">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white w-12 h-12 rounded-full flex justify-center items-center font-bold">
              2
            </div>
            <p><strong>Buy or Sell:</strong> Make a purchase or connect with buyers using our platform.</p>
          </li>
          <li className="relative bg-white p-6 rounded shadow-lg text-center w-full md:w-1/4">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white w-12 h-12 rounded-full flex justify-center items-center font-bold">
              3
            </div>
            <p><strong>We Handle Logistics:</strong> Our team manages the pickup and delivery, so you don't have to lift a finger.</p>
          </li>
          <li className="relative bg-white p-6 rounded shadow-lg text-center w-full md:w-1/4">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white w-12 h-12 rounded-full flex justify-center items-center font-bold">
              4
            </div>
            <p><strong>Relax and Receive:</strong> Sit back and enjoy while your item is delivered directly to your door.</p>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;