// @ts-nocheck


import React from "react";
import { useTheme } from "next-themes";
import logo from "../../assets/img/logo.png";

const Logo = () => {
  const { theme } = useTheme();
  return (
    <div className="flex gap-1 items-center">
      <img className="w-[42px]" src={logo} alt="" />
      <p className="flex font-bold  items-center text-[19px]">
        <span className={` ${theme === "dark" ? "text-[white]" : ""}`}>
          Rest
        </span>
        <span className="text-primaryColor text-[18px]">OS</span>
      </p>
    </div>
  );
};

export default Logo;
