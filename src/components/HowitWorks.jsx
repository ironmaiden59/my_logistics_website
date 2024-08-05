import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">How It Works</h2>
        <ol className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
          <li className="flex-1 bg-gray-50 p-8 rounded-lg shadow-md relative">
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white w-12 h-12 flex justify-center items-center rounded-full">
              1
            </span>
            <strong className="block mb-2 text-lg font-semibold text-blue-600">
              Browse or List
            </strong>
            <p className="text-gray-600">
              Find great deals or list items you want to sell.
            </p>
          </li>
          <li className="flex-1 bg-gray-50 p-8 rounded-lg shadow-md relative">
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white w-12 h-12 flex justify-center items-center rounded-full">
              2
            </span>
            <strong className="block mb-2 text-lg font-semibold text-blue-600">
              Buy or Sell
            </strong>
            <p className="text-gray-600">
              Make a purchase or connect with buyers using our platform.
            </p>
          </li>
          <li className="flex-1 bg-gray-50 p-8 rounded-lg shadow-md relative">
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white w-12 h-12 flex justify-center items-center rounded-full">
              3
            </span>
            <strong className="block mb-2 text-lg font-semibold text-blue-600">
              We Handle Logistics
            </strong>
            <p className="text-gray-600">
              Our team manages the pickup and delivery, so you don't have to
              lift a finger.
            </p>
          </li>
          <li className="flex-1 bg-gray-50 p-8 rounded-lg shadow-md relative">
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white w-12 h-12 flex justify-center items-center rounded-full">
              4
            </span>
            <strong className="block mb-2 text-lg font-semibold text-blue-600">
              Relax and Receive
            </strong>
            <p className="text-gray-600">
              Sit back and enjoy while your item is delivered directly to your
              door.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;