import React from "react";
// @ts-ignore
import demoBanner from "../../../../assets/img/fishdemo.png";
const DemoImage = () => {
  return (
    <div className="flex-1  h-32 w-[100%] lg:w-[54%] mx ">
      <img className="w-full h-full object-cover" src={demoBanner} alt="" />
    </div>
  );
};

export default DemoImage;



export const DemoFoodCard = ({url}) => {
    return (
      <div className=" flex-1 left-1/4 lg:absolute 
      -top-[32%] lg:-top-[45%]">    
        <img className="object-cover h-44 w-full lg:size-[110px] rounded-l-md   lg:rounded-full object-bottom" src={url ||demoBanner} alt="" />
      </div>
    );
  };