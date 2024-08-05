import React from 'react';

const Features = () => {
  return (
    <section id="features" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose EasyTrade?</h2>
        <div className="flex flex-wrap justify-around gap-4">
          <div className="bg-gray-100 p-6 rounded shadow-lg text-center w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">Effortless Shopping</h3>
            <p>Discover a wide variety of pre-owned items available at competitive prices.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow-lg text-center w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">Seamless Selling</h3>
            <p>List your items for sale with ease and connect with potential buyers.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded shadow-lg text-center w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">Handled Logistics</h3>
            <p>We take care of the pickup and delivery, ensuring a smooth transaction every time.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;