import { useTheme } from "@material-tailwind/react";
import { Button } from "antd";
import React from "react";
import { BiSolidFoodMenu } from "react-icons/bi";
import { Link } from "react-router-dom";

const TitleAndDescription = () => {
  const { theme } = useTheme();

  return (
    <>
      <h1
        className={`text-3xl ${
          theme === "dark" ? "text-[white]" : ""
        } md:text-4xl lg:text-5xl font-bold pb-1
        
        `}
      >
        Tasty & Healthy
        <span className="text-4xl py-2 block font-thin font-serif text-[#535353]">
          Organic food & Great Taste
        </span>
      </h1>

      <div
        className={`${
          theme == "dark" ? "text-[#dadada]" : "text-[#828282]"
        } font-sans text-[15px] md:text-[18px] flex gap-3 w-full`}
      >
        <p>Tasty</p>
        <p>Superfresh</p>
        <p>100% Organic</p>
      </div>

      <div className="text-center flex gap-3 pt-5  ">
        <Link to="/all-menu" className="flex">
          <button className="flex items-center py-2 px-6 bg-[#ededed] rounded-full gap-2">
            All Menus <BiSolidFoodMenu></BiSolidFoodMenu>
          </button>
        </Link>

        <Link to="/" className="flex">
          <button className="flex items-center py-2 px-6 text-primaryColor  bg-primaryColor/10  rounded-full gap-2 ">
            Discover more
          </button>
        </Link>
      </div>
    </>
  );
};

export default TitleAndDescription;
