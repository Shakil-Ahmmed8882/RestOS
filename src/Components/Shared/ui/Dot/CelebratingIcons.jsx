import { GoDot } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { DiDotnet } from "react-icons/di";
import { IoBalloon } from "react-icons/io5";
import { IoBalloonOutline } from "react-icons/io5";
import { FaWineBottle } from "react-icons/fa6";
import { MdOutlineCelebration } from "react-icons/md";


const CelebratingIcons = () => {
  return (
    <>
      <GoDotFill className="absolute text-gradient-to-tr from-[white] to-[#00ff66] animate-pulse opacity-30 text-3xl font-bold top-0 right-32" />
      <GoDot className="absolute animate-pulse  opacity-30 text-3xl text-[#35ffb8] font-bold bottom-0 left-32" />
      <IoBalloon className="absolute animate-pulse opacity-30 text-3xl font-bold top-0 left-32" />
      <IoBalloonOutline className="absolute opacity-30 text-3xl font-bold top-20 right-32" />
      <FaWineBottle className="text-4xl absolute bottom-0 right-0    text-deepPink opacity-10 animate-pulse" />
      <MdOutlineCelebration className="text-4xl absolute top-0 left-0 delay-1000  animate-pulse" />
    </>
  );
};

export default CelebratingIcons; 