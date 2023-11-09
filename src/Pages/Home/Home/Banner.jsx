import { useTheme } from "next-themes";
import Curve from "./curve";
import bannerImg from '../../../assets/img/food-banner.png'
import './home.css'
import AnimatedBlub from "../../../Components/Shared/animatedBlub/AnimatedBlub";
import { Link } from "react-router-dom";
import Slider from "./banner/Slider";


import { BiSolidFoodMenu } from "react-icons/bi";

const Banner = () => {
  const {theme} = useTheme()
  return (
    <div className="max-w-7xl mx-auto">
      <Curve></Curve>
      <div className="z-10 mr-8 sm:mt-11 md:mt-24 gap-16 md:flex justify-center items-center">

        <div className="flex-1 w-1/2">
          <Slider></Slider>
        </div>
        <div className="space-y-1  relative  ">
          <h1 className={`text-3xl ${theme == 'dark' ? 'text-[white] ' : ''} md:text-5xl lg:text-5xl font-bold pb-1`}>
            Welcome to RestOS
          </h1>
          <p className={`${theme == "dark" ? "text-[#e3e3e3]" : ""} space-y-2`}>
            A trendy burger joint with a twist! Our mouthwatering burgers are made with locally sourced ingredients and served with a side of crispy, golden fries. From classic cheeseburgers to unique gourmet creations.
          </p>
          <Link to='/all-menu'>
            <button className="mt-5 flex items-center gap-3 border-none text-primaryColor text-2xl">All Menus <BiSolidFoodMenu></BiSolidFoodMenu></button>
          </Link>
          {
            theme == 'light' &&
            <div className="fixed right-11 -top-32">
              <AnimatedBlub></AnimatedBlub>
            </div>
          }
        </div>
      </div>

        <img className="absolute w-80 -bottom-11 right-0 filter blur-3xl md:blur-sm -z-10 bg-blend-multiply " src="https://i.ibb.co/3hNBP6b/bg-leaf.png" alt="" />
    </div>
  );
};

export default Banner;