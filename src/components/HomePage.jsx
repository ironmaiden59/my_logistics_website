import React from 'react';
import { Link } from 'react-router-dom';

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
        className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white py-24"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-bold mb-6">
              Transform Online Deals into Doorstep Deliveries
            </h1>
            <p className="text-xl mb-8">
              Buy and sell items from any marketplace with ease. We handle the delivery so you can focus on what matters.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-white text-indigo-600 py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            {/* <img
              src="/images/hero-image.svg"
              alt="Convenient online transactions"
              className="w-full"
            /> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6">
              {/* <img
                src="/images/feature-easy.svg"
                alt="Easy to Use"
                className="w-24 h-24 mx-auto mb-4"
              /> */}
              <h3 className="text-2xl font-semibold mb-2">Seamless Experience</h3>
              <p>
                Import products directly from marketplaces using our Chrome extension.
              </p>
            </div>
            <div className="p-6">
              {/* <img
                src="/images/feature-secure.svg"
                alt="Secure Transactions"
                className="w-24 h-24 mx-auto mb-4"
              /> */}
              <h3 className="text-2xl font-semibold mb-2">Secure Payments</h3>
              <p>
                Conduct transactions safely within our platform with full transparency.
              </p>
            </div>
            <div className="p-6">
              {/* <img
                src="/images/feature-delivery.svg"
                alt="We Deliver"
                className="w-24 h-24 mx-auto mb-4"
              /> */}
              <h3 className="text-2xl font-semibold mb-2">Hassle-Free Delivery</h3>
              <p>
                We manage the pickup and delivery, bringing your items straight to your door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-50 py-24">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            {[
              {
                number: '1',
                title: 'Import Items',
                description:
                  'Use our extension to transfer item details from any marketplace.',
                image: '/images/step-import.svg',
              },
              {
                number: '2',
                title: 'Connect & Communicate',
                description:
                  'Send a link to the seller and chat directly within our platform.',
                image: '/images/step-connect.svg',
              },
              {
                number: '3',
                title: 'Make Payment',
                description:
                  'Purchase securely through our app with peace of mind.',
                image: '/images/step-payment.svg',
              },
              {
                number: '4',
                title: 'We Deliver',
                description:
                  'We handle pickup and deliver the item to your doorstep.',
                image: '/images/step-deliver.svg',
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex-1 bg-white p-6 m-4 rounded-lg shadow-md text-center"
              >
                {/* <img
                  src={step.image}
                  alt={step.title}
                  className="w-20 h-20 mx-auto mb-4"
                /> */}
                <h3 className="text-xl font-semibold mb-2">
                  {step.number}. {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="bg-indigo-600 text-white py-24">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Simplify Your Transactions?
          </h2>
          <p className="text-xl mb-8">
            Join now and experience a new way of buying and selling online.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-indigo-600 py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Sign Up Today
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
          <form
            id="contactForm"
            onSubmit={handleContactSubmit}
            className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="mt-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows="5"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-6 w-full py-3 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;