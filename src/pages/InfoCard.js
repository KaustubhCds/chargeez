import React from 'react';

function InfoCard({ imgSrc, title, description }) {
  return (
    <div className="flex flex-col items-center mx-5 my-4 sm:my-0">
      <img src={imgSrc} className="w-56 rounded-lg" alt={title} />
      <div className="text-xl font-poppins text-[#7DF9FF] w-56 pt-3 text-center">
        {title}
      </div>
      <div className="w-56 pt-3 font-poppins text-white text-center">
        {description}
      </div>
    </div>
  );
}

export default InfoCard;
