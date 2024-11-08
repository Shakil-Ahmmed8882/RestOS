import { useTheme } from "@material-tailwind/react";
import { Button } from "antd";
import React from "react";
import { BiSolidFoodMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { SingleCheckBadge } from "../../../../assets/icons/Icons";

const TitleAndDescription = () => {
  const { theme } = useTheme();

  return (
    <>
      <h1
        className={`text-3xl ${
          theme === "dark" ? "text-[white]" : ""
        } md:text-4xl lg:text-5xl font-bold pb-1 space-y-7
        
        `}
      >
        Top Sellling food
        <span className="text-3xl py-2 block font-thin font-serif text-[#535353]">
          Organic food & Great Taste
        </span>
      </h1>


      <div
        className={`${
          theme == "dark" ? "text-[#dadada]" : "text-[#828282]"
        } font-sans text-[15px]  md:text-[18px] flex gap-3 w-full justify-end`}
      >
        <p className="flex items-center gap-1 "><SingleCheckBadge  /> Tasty</p>
        <p className="flex items-center gap-1 "> <SingleCheckBadge /> Superfresh</p>
        <p className="flex items-center gap-1 "> <SingleCheckBadge /> 100% Organic</p>
      </div>
       
    </>
  );
};

export default TitleAndDescription;
