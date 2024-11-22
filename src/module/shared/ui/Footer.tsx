// @ts-nocheck

import { BiFork } from "react-icons/bi";
import { useTheme } from "next-themes";
import lightClock from "../../../assets/img/light-clock.gif";
import darkClock from "../../../assets/img/dark-clock.gif";
import React from "react";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <div
      className={` py-20 relative bottom-0 bg-[#000] text-[#b2b2b2] `}
    >
      <footer className="footer pl-4 flex-wrap flex md:justify-between max-w-6xl mx-auto">
        <div className="w-[190px]">
          <div className="flex gap-1 pb-3 items-center">
            {theme == "dark" ? (
              <img className="w-[35px]" src={lightClock} alt="" />
            ) : (
              <img className="w-[35px]" src={darkClock} alt="" />
            )}
            <p className="flex text-[white]  font-bold items-center text-[19px]">
            Rest
              <span className="text-primaryColor text-[18px]">OS</span>
            </p>
          </div>
          <a className="link link-hover">Menu</a>
          <a className="link link-hover">Reservations</a>
          <a className="link link-hover">Events</a>
          <a className="link link-hover">Catering</a>
        </div>

        <div className="footer-column w-[190px]">
          <header className="font-bold pb-3 text-[white]">About Us</header>
          <a className="link link-hover">Our Story</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Careers</a>
          <a className="link link-hover">Press</a>
        </div>

        <div className="footer-column w-[190px] ">
          <header className="font-bold pb-3 text-[white]">Legal</header>
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Cookies</a>
        </div>
        <div className="text-[#ff5cb047]">
          <BiFork className="w-60 h-72 absolute -top-3 right-16"></BiFork>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
