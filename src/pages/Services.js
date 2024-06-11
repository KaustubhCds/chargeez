import React from "react";
import NavBar from "./NavBar";

const Services = () => {
  return (
    <div className="bg-background-grey min-h-screen">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-[#7df9ff] text-6xl font-bold text-center mb-20">
          Our Services
        </h1>

        {/* First Block */}
        <div className="flex flex-wrap items-center mb-8">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src="./service1.jpg"
              alt="Service 1"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          <p className="w-full md:w-1/2 md:pl-10 text-white text-2xl leading-relaxed mt-4 md:mt-0">
            Welcome to our Services. Whether you're an electric vehicle owner looking for a convenient charge or a business owner wanting to list your charging station, you've come to the right place. Explore our comprehensive services designed to make your EV charging experience seamless and efficient.
          </p>
        </div>

        {/* Second Block */}
        <div className="flex flex-wrap items-center mb-8 md:pt-32">
          <div className="w-full md:w-1/2 order-2 md:order-1 text-white">
            <h2 className="text-5xl font-semibold mb-4 text-teal-300">Become a Charging Station Host</h2>
            <p className="text-2xl leading-relaxed md:pr-10">
              Share Your Charger. Join our network and list your charging station on our platform. It’s not just about earning additional income; it's about being part of a community that promotes sustainable living. Benefits include: 
              <ul className="list-disc pl-5 mt-2">
                <li>Earn Extra Income: Charge fees for station usage and boost your earnings.</li>
                <li>Increase Foot Traffic: Attract EV owners to your business, enhancing potential customer engagement.</li>
                <li>Support Green Living: Contribute to environmental sustainability by supporting electric vehicle usage and promoting EV tourism.</li>
                <li>Hassle-Free Setup: Our team ensures a smooth setup process, from listing to operation.</li>
              </ul>
            </p>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2 mb-4 md:mb-0">
            <img
              src="./services2.png"
              alt="Service 2"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Third Block */}
        <div className="flex flex-wrap items-center mb-8 md:pt-32">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src="./services3.png"
              alt="Service 3"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 text-white">
            <h2 className="text-5xl font-semibold mb-4 md:pl-10 text-teal-300">Discovering Charging Stations</h2>
            <p className="text-2xl leading-relaxed md:pl-10">
              Navigating the world of electric vehicles is easy with our extensive charging station listings. Locate available charging stations in your vicinity or plan your journey by finding stations along your route. Features include: 
              <ul className="list-disc pl-5 mt-2">
                <li>Location-Based Searches: Pinpoint stations in your desired area or along your travel path.</li>
                <li>Charger Specifications: Identify the right fit for your vehicle by filtering for specific charger types.</li>
                <li>Real-Time Availability: Avoid the wait by checking station occupancy in real-time.</li>
                <li>Cost Comparisons: Stay informed about the charging costs and choose the most economical options.</li>
              </ul>
            </p>
          </div>
        </div>

        {/* Fourth Block */}
        <div className="flex flex-wrap items-center md:pt-32">
          <div className="w-full md:w-1/2 order-2 md:order-1 text-white">
            <h2 className="text-5xl font-semibold mb-4 text-teal-300">Resource and Support</h2>
            <p className="text-2xl leading-relaxed md:pr-10">
              Whether you're new to electric vehicles or a seasoned expert, our resource center has something for you. From understanding the basics of EV charging to exploring the benefits of peer-to-peer charging, we've got you covered.
              <ul className="list-disc pl-5 mt-2">
                <li>Guides and FAQs</li>
                <li>Peer-to-Peer Charging: Learn how P2P charging is revolutionizing the way we power our vehicles.</li>
                <li>Community Engagement: Be a part of a community that supports each other. Share insights, ask questions, and find companionship with fellow EV enthusiasts in our community forums.</li>
                <li>Troubleshooting Tips: Quick solutions for common issues faced during EV charging.</li>
                <li>Customer Support: Our dedicated team is here to assist you every step of the way.</li>
              </ul>
            </p>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2 mb-4 md:mb-0">
            <img
              src="./services4.png"
              alt="Service 4"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
