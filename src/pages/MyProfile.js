import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Walletdet from "./Walletdet";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";

function Profile() {
  return (
    <div className="w-full sm:w-4/5 p-4 bg-gray-100 sm:pl-60 pt-20">
      <div className="flex items-center mb-4">
        <div className="h-48 w-48 rounded-full">
          {/* Avatar */}
          <img
            src="./service1.jpg"
            alt="User Avatar"
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        <div className="ml-4">
          <h2 className="text-3xl font-bold text-gray-900 pl-10">User Name</h2>
          <p className="text-2xl text-gray-700 pl-10">Location</p>
        </div>
      </div>

      <form className="space-y-4 pt-10">
        {/* First Row */}
        <div className="flex flex-wrap">
          <div className="form-group w-full sm:w-1/2">
            <label className="block mb-2 text-lg" htmlFor="firstName">
              First Name:
            </label>
            <input
              className="p-3 w-2/3 border border-gray-800 rounded-lg"
              type="text"
              id="firstName"
              name="firstName"
            />
          </div>
          <div className="form-group w-full sm:w-1/2">
            <label className="block mb-2 text-lg" htmlFor="lastName">
              Last Name:
            </label>
            <input
              className="p-3 w-2/3 border border-gray-800 rounded-lg"
              type="text"
              id="lastName"
              name="lastName"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-wrap">
          <div className="form-group w-full sm:w-1/2">
            <label className="block mb-2 text-lg" htmlFor="email">
              Email:
            </label>
            <input
              className="p-3 w-2/3 border border-gray-800 rounded-lg"
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div className="form-group w-full sm:w-1/2">
            <label className="block mb-2 text-lg" htmlFor="phoneNumber">
              Phone Number:
            </label>
            <input
              className="p-3 w-2/3 border border-gray-800 rounded-lg"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
            />
          </div>
        </div>

        {/* Third Row */}
        <div className="flex flex-wrap">
          <div className="form-group w-full sm:w-1/2">
            <label className="block mb-2 text-lg" htmlFor="location">
              Location:
            </label>
            <input
              className="p-3 w-2/3 border border-gray-800 rounded-lg"
              type="text"
              id="location"
              name="location"
            />
          </div>
          <div className="form-group w-full sm:w-1/2">
            <label className="block mb-2 text-lg" htmlFor="postal">
              Postal Code:
            </label>
            <input
              className="p-3 w-2/3 border border-gray-800 rounded-lg"
              type="text"
              id="postal"
              name="postal"
            />
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-center text-2xl">
          <button
            className="px-10 -translate-x-28 rounded-xl py-2 mt-10 item bg-green-500 text-white  hover:bg-green-600"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

function Myprofile() {
  return (
    <div>
      <NavBar />
      <div className="flex h-screen">
        <Sidebar />
        <Profile />
      </div>
      <Walletdet />
    </div>
  );
}

export default Myprofile;
