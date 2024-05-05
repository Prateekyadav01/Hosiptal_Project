// ContactPage.js

import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-semibold mb-4">Contact Hospital Management</h1>
            </div>
            <form className="mt-10" action="#" method="POST">
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-gray-700">Name</span>
                  <input
                    type="text"
                    className="form-input mt-1 block w-full rounded-md border-gray-300"
                    placeholder="John Doe"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Email</span>
                  <input
                    type="email"
                    className="form-input mt-1 block w-full rounded-md border-gray-300"
                    placeholder="john.doe@example.com"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Message</span>
                  <textarea
                    className="form-textarea mt-1 block w-full rounded-md border-gray-300"
                    rows="4"
                    placeholder="Write your message here..."
                  ></textarea>
                </label>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 focus:ring-blue-400 focus:ring-offset-blue-300 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
