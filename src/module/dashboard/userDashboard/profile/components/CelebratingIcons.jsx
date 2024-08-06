import { GoDot } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { DiDotnet } from "react-icons/di";
import { IoBalloon } from "react-icons/io5";
import { IoBalloonOutline } from "react-icons/io5";
import { FaWineBottle } from "react-icons/fa6";
import { MdOutlineCelebration } from "react-icons/md";
import React from "react";


const CelebratingIcons = () => {
  return (
    <>
      <GoDotFill className="absolute opacity-30 text-3xl font-bold top-0 right-32" />
      <GoDot className="absolute  opacity-75 text-3xl font-bold bottom-0 left-32" />
      <IoBalloon className="absolute  opacity-45 text-3xl font-bold top-0 left-32" />
      <IoBalloonOutline className="absolute opacity-20 text-3xl font-bold top-20 right-32" />
      <FaWineBottle className="text-4xl absolute bottom-0 right-0    text-deepPink opacity-10 animate-pulse" />
      <MdOutlineCelebration className="text-4xl opacity-10 absolute top-0 left-0  animate-pulse" />
    </>
  );
};

export default CelebratingIcons; 