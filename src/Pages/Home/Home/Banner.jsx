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
    <div className="">
      <Curve></Curve>
      <div className="relative z-10 mr-8 md:flex text-center items-center">
        <img className="md:mt-11 lg:mr-8 pr-16 md:w-1/2 lg:w-[1300px]"
          src={bannerImg}
          alt=""
        />
        <div className="absolute -left-8 -bottom-8 lg:bottom-8">
          <Slider></Slider>
        </div>
        <div className="space-y-1 ">
          <h1 className={`text-3xl ${theme == 'dark' ? 'text-gradient' : ''} md:text-5xl lg:text-6xl font-bold pb-1`}>
            Welcome to Our Burger Paradise
          </h1>
          <p className={`${theme == "dark" ? "text-[#e3e3e3]" : ""} space-y-2`}>
            A trendy burger joint with a twist! Our mouthwatering burgers are made with locally sourced ingredients and served with a side of crispy, golden fries. From classic cheeseburgers to unique gourmet creations.
          </p>
          <Link to='/all-menu'>
            <button className="btn mt-5 border-none bg-primaryColor text-[white]">All Menus</button>
          </Link>
          {
            theme == 'light' &&
            <div className="fixed right-11 -top-32">
              <AnimatedBlub></AnimatedBlub>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Banner;