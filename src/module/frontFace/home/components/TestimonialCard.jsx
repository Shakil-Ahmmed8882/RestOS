import React from 'react';
import { FillStar } from '../../../../assets/icons';


const TestimonialCard = ({ name, role, feedback, rating, image, handle }) => {
  return (
    <div className="
     p-6  shadow-2xl shadow-[#e5e5e5] rounded-lg">
      {/* Rating */}
      <div className="flex items-center mb-4">
        
          <div className="flex items-center gap-2 py-4">
          <FillStar className="text-[27px] text-primaryColor" />
          <FillStar className="text-[27px] text-primaryColor" />
          <FillStar className="text-[27px] text-primaryColor" />
          <FillStar className="text-[27px] text-primaryColor" />
          <FillStar className="text-[27px] text-[#E5E5E5]" />
          
        </div>
      </div>

      {/* Feedback */}
      <p className="text-lg font-semibold mb-2">{feedback.title}</p>
      <p className="mb-4 description text-[17px]">{feedback.text}</p>

      {/* User Info */}
      <div className="flex items-center">
        <img className="w-10 h-10 object-cover rounded-full mr-4" src={image} alt={`${name}'s avatar`} />
        <div className='pt-4'>
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-sm py-1">
            {role} <a href="#" className="text-primaryColor ">@{handle}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
