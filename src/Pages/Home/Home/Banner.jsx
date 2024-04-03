import { FaStar } from "react-icons/fa6";

import { useTheme } from "next-themes";
import Curve from "./curve";
import bannerImg from "../../../assets/img/food-banner.png";
import "./home.css";
import AnimatedBlub from "../../../Components/Shared/animatedBlub/AnimatedBlub";
import { Link } from "react-router-dom";
import Slider from "./banner/Slider";

import { BiSolidFoodMenu } from "react-icons/bi";
import customTheme from "../../../Utils/Theme/theme";
import demoBanner from "../../../assets/img/fishdemo.png";
import GroupAvatar from "../../../Components/Shared/common/Avatar";
import TitleAndDescription from "../../../Components/Shared/common/TitleAndDescription";

const Banner = () => {
  const { theme } = useTheme();
  const color = customTheme(theme, "#ffffffea", "black", "#00000097", "");

  return (
    <div className="max-w-6xl flex px-3 flex-col-reverse md:flex-row items-center mx-auto md:overflow-hidden ">
      <div className="flex-1">
        <img
          className=" absolute w-full left-0 top-0 object-cover h-full"
          src="https://cdn.dribbble.com/userupload/13293255/file/original-66da1d93367ee9b8043e702f8a7276dd.png?resize=752x"
          alt=""
        />
        <div
          className={` md:block ${
            theme == "dark"
              ? "bg-[#000000cb]"
              : " bg-gradient-to-b from-[#ffffffc1]  to-[#ffffff]"
          }  w-full absolute inset-0`}
        ></div>
        {/* <Curve></Curve> */}

        <div className="-z-30 md:mr-8 sm:mt-11 flex-col-reverse md:flex-row md:mt-20 gap-16  md:flex justify-center items-center">
          <div className="space-y-1  relative z-10">
            <TitleAndDescription>
              <span className=" bg-gradient-to-r from-primaryColor to-[#00b200] bg-clip-text text-transparent">
                {" "}
                Great Taste
              </span>
            </TitleAndDescription>

            {/* <p className={`${theme == "dark" ? "text-[#e3e3e3]" : ""} space-y-2`}>
            A trendy burger joint with a twist! Our mouthwatering burgers are made with locally sourced ingredients and served with a side of crispy, golden fries. From classic cheeseburgers to unique gourmet creations.
          </p> */}

            {/* <Slider></Slider> */}
            <Link to="/all-menu" className="flex">
              <button className="my-5 md:my-6 w-full justify-center  text-center sm:w-1/2 flex bg-primaryColor text-[white] p-2 md:p-3 lg:w-1/3 rounded-lg items-center gap-3 border-none  md:text-[19px] ">
                All Menus <BiSolidFoodMenu></BiSolidFoodMenu>
              </button>
            </Link>
            <div>
              <h2
                className={`${
                  theme == "dark" ? "text-[#dadada]" : "text-[#828282]"
                } font-sans md:text-[18px]`}
              >
                Our Happy customers
              </h2>
              <div className="flex items-center gap-5">
                <div>
                  <GroupAvatar />
                </div>
                <p className="flex bg-[#FFF5E4] p-1 px-8">
                  <FaStar />{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1  h-full z-20 mt-28 md:-mt-3 md:mb-0 mb-16 w-[80%] sm:w-[60%] ">
        <img className="w-full h-full" src={demoBanner} alt="" />
      </div>
    </div>
  );
};

export default Banner;
