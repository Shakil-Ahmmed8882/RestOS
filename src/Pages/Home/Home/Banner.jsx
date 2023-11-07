

import { useTheme } from "next-themes";
import Curve from "./curve";
import bannerImg from '../../../assets/img/food-banner.png'
import './home.css'
import AnimatedBlub from "../../../Components/Shared/animatedBlub/AnimatedBlub";
import { Link } from "react-router-dom";
import Slider from "./banner/Slider";
const Banner = () => {
  const {theme} = useTheme()
  return (
    <div className="overflow-x-hidden">
      <Curve></Curve>
      <div className="relative z-10 flex items-center">
        <img className="mt-11 w-[1300px]"
          src={bannerImg}
          alt=""
        />
        <div className="space-y-1">
          <h1 className={`text-3xl ${theme == 'dark'?'text-gradient':''} md:text-5xl lg:text-6xl font-bold pb-1`}>
            Hello world
          </h1>
          <p className={`${theme == "dark" ? "text-[#e3e3e3]" : ""} space-y-2`}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt
            quibusdam ipsa, sapiente facere pariatur excepturi mollitia aliquid
            laboriosam illum rerum voluptas molestias quae enim esse
            voluptatibus maxime ab commodi labore!
          </p>
          <Link to='/all-menu'>
          <button className="btn mt-5 border-none bg-primaryColor text-[white]">All menues</button>         
          </Link>
            {
              theme == 'light'&&
            <div className="fixed right-11 -top-32">
          <AnimatedBlub></AnimatedBlub>
          </div>

            }
        </div>
        <Slider></Slider>
      </div>
    </div>
  );
};

export default Banner;
