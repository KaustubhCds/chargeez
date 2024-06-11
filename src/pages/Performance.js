import React from 'react';
import StatCard from './StatCard';

const Performance = () => {
  return (
    <section className="bg-black h-auto w-full">
      <div className="flex flex-wrap p-8 justify-center items-center space-x-4 md:space-x-8 lg:space-x-16 mx-auto">
        <StatCard number="15000+" label="Chargers Onboarded" />
        <StatCard number="1.2M+" label="Charging Sessions/Year" />
        <StatCard number="36000+" label="Tons CO2 Reduced/Year" />
        <StatCard number="65000+" label="Users Onboarded" />
        <StatCard number="25500+" label="Stations on Roaming" />
      </div>
    </section>
  );
};

export default Performance;
