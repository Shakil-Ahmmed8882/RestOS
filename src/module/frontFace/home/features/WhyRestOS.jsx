import React from "react";

import fastdelivery from "../../../../assets/img/home/fastdelivery.png";
import pickup from "../../../../assets/img/home/pickup.png";
import hotdeals from "../../../../assets/img/home/hotdeals.png";



const WhyRestOS = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="">Why RestOS?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div key={reason.id} className="flex flex-col items-center p-6 bg-gray-100 rounded-lg">
              <img src={reason.imgSrc} alt={reason.altText} className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{reason.title}</h3>
              <p className=" description leading-7 text-[17px] text-center">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyRestOS;



const reasons = [
    {
      id: 1,
      imgSrc: hotdeals,
      altText: "Hot Deals & Offers",
      title: "Hot Deals & Offers",
      description:
        "We want to show you some love by giving you discounts on food at our restaurants.",
    },
    {
      id: 2,
      imgSrc: pickup,
      altText: "Self Pick-Up",
      title: "Self Pick-Up",
      description:
        "Self Pick-up is a service that allows you to place orders through our app.",
    },
    {
      id: 3,
      imgSrc: fastdelivery,
      altText: "Fastest Delivery",
      title: "Fastest Delivery",
      description:
        "Choose your food, and we'll deliver it to you as fast as possible. Download the app and enjoy food.",
    },
  ];