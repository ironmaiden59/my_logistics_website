import React from 'react';

const HomePage = () => {
  const handleContactSubmit = (event) => {
    event.preventDefault();
    alert('Form submitted! We will contact you soon.');
  };

  return (
    <div>
      {/* Hero Section */}
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
            href="/signup"
            className="bg-white text-blue-600 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Join Our Marketplace
          </a>
        </div>
      </section>

      {/* Features Section */}
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

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white py-24">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          <ol className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
            {[
              {
                number: '1',
                title: 'Browse or List',
                description:
                  'Find great deals or list items you want to sell.',
              },
              {
                number: '2',
                title: 'Buy or Sell',
                description:
                  'Make a purchase or connect with buyers using our platform.',
              },
              {
                number: '3',
                title: 'We Handle Logistics',
                description:
                  'Our team manages the pickup and delivery, so you don\'t have to lift a finger.',
              },
              {
                number: '4',
                title: 'Relax and Receive',
                description:
                  'Sit back and enjoy while your item is delivered directly to your door.',
              },
            ].map((step, index) => (
              <li
                key={index}
                className="flex-1 bg-gray-50 p-8 rounded-lg shadow-md relative"
              >
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white w-12 h-12 flex justify-center items-center rounded-full">
                  {step.number}
                </span>
                <strong className="block mb-2 text-lg font-semibold text-blue-600">
                  {step.title}
                </strong>
                <p className="text-gray-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
          <form
            id="contactForm"
            onSubmit={handleContactSubmit}
            className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message:
              </label>
              <textarea
                id="message"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;