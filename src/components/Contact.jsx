import React from 'react';

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Form submitted! We will contact you soon.');
  };

  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl text-center mb-10">Contact Us</h2>
        <form
          id="contactForm"
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-8 rounded shadow-lg"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              id="message"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;