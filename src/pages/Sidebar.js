
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear cookies
    removeCookie("user", { path: "/" });

    // Clear local storage and session storage if used
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to the sign-in page with history replacement
    navigate("/signin", { replace: true });
  };

  return (
    <div className={`bg-[#D9D9D9] p-4 ${isOpen ? "w-1/5" : "w-full sm:w-1/5"} sm:relative`}>
      <button onClick={toggleSidebar} className="block sm:hidden">
        {isOpen ? "Collapse" : "Expand"}
      </button>
      <h2 className="mb-4 text-4xl pt-5 font-bold text-gray-900">
        User Profile
      </h2>
      <ul className={`${isOpen ? "" : "hidden"} sm:block`}>
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
          <button
            onClick={handleLogout}
            className={`block p-2 pt-7 text-2xl text-gray-900 hover:text-white w-full text-left ${
              location.pathname === "/logout" ? "text-white" : ""
            }`}
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
