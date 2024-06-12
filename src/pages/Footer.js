import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#36454F] w-full h-auto pt-10 pb-10">
      <div className="container mx-auto text-center">
        <ul className="flex flex-wrap justify-center space-x-4 sm:space-x-8 text-white">
          <li>
            <a href="/about-us" className="hover:underline">
              About Us
            </a>
          </li>
          <li>
            <a href="/contact-us" className="hover:underline">
              Contact Us
            </a>
          </li>
          <li>
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms-conditions" className="hover:underline">
              Terms & Conditions
            </a>
          </li>
        </ul>
      </div>
    </footer>

);
};

export default Footer;
