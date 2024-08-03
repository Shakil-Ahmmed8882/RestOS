import { useTheme } from "@material-tailwind/react";
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
      <Link to="/all-menu" className="flex">
        <button className="my-5 md:my-4 w-full text-center sm:w-1/2 flex text-primaryColor lg:w-1/3 rounded-lg items-center gap-3 border-none h-full  md:text-[19px] ">
          All Menus <BiSolidFoodMenu></BiSolidFoodMenu>
        </button>
      </Link>
    </>
  );
};

export default TitleAndDescription;
