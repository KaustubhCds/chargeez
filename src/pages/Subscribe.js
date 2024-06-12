import React from 'react';

const Subscribe = () => {
  return (
    <div className="bg-[#36454F] w-full h-auto py-10 justify-center pt-28">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="w-full md:w-1/3 text-center md:text-left">
          <div className="text-white text-2xl font-bold">
            Subscribe to Our Newsletter
          </div>
          <div className="text-white text-sm mt-4 font-light">
            Stay updated with our latest news and updates
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:ml-20 w-full md:w-1/3">
          <div className="flex flex-col md:flex-row items-center">
            <label htmlFor="email" className="text-white mr-2 mb-2 md:mb-0">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="px-2 py-1 rounded w-80"
              placeholder="Enter your email"
            />
          </div>
          <div className="text-white text-xs ml-12 mt-2">we respect your privacy</div>
          <button className="mt-4 md:mt-5 px-12 py-2 ml-12 bg-white text-black  rounded-lg hover:bg-blue-700">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
