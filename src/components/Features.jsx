import React from 'react';

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Why Choose EasyTrade?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Effortless Shopping
            </h3>
            <p className="text-gray-600">
              Discover a wide variety of pre-owned items available at
              competitive prices.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Seamless Selling
            </h3>
            <p className="text-gray-600">
              List your items for sale with ease and connect with potential
              buyers.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Handled Logistics
            </h3>
            <p className="text-gray-600">
              We take care of the pickup and delivery, ensuring a smooth
              transaction every time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;