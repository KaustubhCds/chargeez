import React from 'react';
import InfoCard from './InfoCard';

const WhyToChoose = () => {
  return (
    <section className="bg-[#36454F] w-full h-auto">
      <div className="text-[#39FF14] font-poppins text-3xl text-center pt-14">
        Why Choose ChargeEazy?
      </div>

      <div className="pt-16 flex flex-wrap justify-center">
        <InfoCard
          imgSrc="/1.png"
          title="Find Stations Nearby"
          description="Quickly locate charging stations near you with our easy-to-use map."
        />
        <InfoCard
          imgSrc="/2.png"
          title="Easy Start Charging"
          description="Start charging your EV in just a few clicks with our user-friendly interface."
        />
        <InfoCard
          imgSrc="/3.png"
          title="Transparent Pricing"
          description="Get clear and upfront pricing for all your charging needs."
        />
        <InfoCard
          imgSrc="/4.png"
          title="Reliable Support"
          description="24/7 support to assist you anytime, anywhere."
        />
      </div>

      <div className="text-[#39FF14] font-poppins text-3xl text-center pt-14">
        How ChargeEazy Works?
      </div>

      <div className="pt-16 flex flex-wrap justify-center">
        <InfoCard
          imgSrc="/5.png"
          title="Locate Stations"
          description="Search and select a nearby charging station."
        />
        <InfoCard
          imgSrc="/6.png"
          title="Plug In"
          description="Connect your EV to the station."
        />
        <InfoCard
          imgSrc="/7.png"
          title="Start Charging"
          description="Use the app to begin charging."
        />
        <InfoCard
          imgSrc="/8.png"
          title="Track & Pay"
          description="Monitor charging status and pay easily through the app."
        />
      </div>
    </section>
  );
};

export default WhyToChoose;
