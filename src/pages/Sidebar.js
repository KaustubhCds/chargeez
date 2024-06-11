import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`w-1/5 bg-[#D9D9D9] p-4 ${isOpen ? "" : "hidden"}`}>
      <button onClick={toggleSidebar} className="block sm:hidden">
        {isOpen ? "Collapse" : "Expand"}
      </button>
      <h2 className="mb-4 text-4xl pt-5 font-bold text-gray-900">
        User Profile
      </h2>
      <ul>
        <li
          className={`mb-2 hover:bg-gray-700 rounded ${
            location.pathname === "/user-details" ? "bg-gray-700" : ""
          }`}
        >
          <Link
            to="/user-details"
            className={`block p-2 pt-7 text-2xl text-gray-900 hover:text-white ${
              location.pathname === "/user-details" ? "text-white" : ""
            }`}
          >
            User Details
          </Link>
        </li>
        <li
          className={`mb-2 hover:bg-gray-700 rounded ${
            location.pathname === "/wallet-details" ? "bg-gray-700" : ""
          }`}
        >
          <Link
            to="/wallet-details"
            className={`block p-2 pt-7 text-2xl text-gray-900 hover:text-white ${
              location.pathname === "/wallet-details" ? "text-white" : ""
            }`}
          >
            Wallet Details
          </Link>
        </li>
        <li
          className={`mb-2 hover:bg-gray-700 rounded ${
            location.pathname === "/logout" ? "bg-gray-700" : ""
          }`}
        >
          <Link
            to="/logout"
            className={`block p-2  pt-7  text-2xl text-gray-900 hover:text-white ${
              location.pathname === "/logout" ? "text-white" : ""
            }`}
          >
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
