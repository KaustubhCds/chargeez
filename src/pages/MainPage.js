import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Performance from './Performance';
import WhyToChoose from './WhyToChoose';
import Subscribe from './Subscribe';
import Footer from './Footer';

function MainPage() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/signin'); // Navigate to the sign in page
  };

  const handleFindChargerClick = () => {
    navigate('/chargers'); // Navigate to the chargers page or component
  };

  return (
    <div className='w-screen overflow-hidden'>
      <NavBar />
      <div className='h-auto md:h-[500px] w-full bg-background-grey flex flex-col md:flex-row'>
        {/* left side */}
        <div className='flex flex-col justify-center items-start p-8 md:w-1/2'>
          <div className='text-[#7df9ff] text-3xl md:text-4xl font-bold  md:ml-12'>
            <p>"Charge Easy - Simplify</p>
            <p>Your EV Charging Journey."</p>
          </div>
          <div className='text-white mt-6 md:mt-12 text-xl md:text-2xl ml-0 md:ml-16'>
            <p>"Find, Use & Pay for Charging</p>
            <p className='ml-0 md:ml-8'>Stations Effortlessly."</p>
          </div>
          <div className='mt-10 md:mt-16 flex flex-col md:flex-row ml-0 md:ml-16 space-y-4 md:space-y-0 md:space-x-4'>
            <button
              className='h-10 w-36 bg-[#8AFF74] rounded-xl text-brown font-semibold transition-transform transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400'
              onClick={handleFindChargerClick}
            >
              Find Your Charger
            </button>
            <button
              className='h-10 w-36 bg-[#8AFF74] rounded-xl text-brown-600 font-semibold transition-transform transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400'
              onClick={handleSignInClick}
            >
              Sign In / Sign Up
            </button>
          </div>
        </div>
        {/* right side */}
        <div className='flex justify-center items-center md:w-1/2'>
          <img src="/mainImage.png" alt='Hero image' className='w-full h-full object-cover' />
        </div>
      </div>
      <Performance />
      <WhyToChoose />
      <Subscribe />
      <Footer />
    </div>
  );
}

export default MainPage;
