import React from 'react';

const StatCard = ({ number, label }) => (
  <div className="flex-1 mx-2 my-4 sm:my-0">
    <div className="text-4xl text-white font-poppins">{number}</div>
    <div className="text-sm text-white font-poppins">{label}</div>
  </div>
);

export default StatCard;
