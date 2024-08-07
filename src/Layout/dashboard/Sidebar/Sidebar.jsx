// Icons

import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { SidebarContents } from "./features/SidebarContents";
import React from "react";
import Logo from "../../../shared/ui/Logo";

const Sidebar = () => {
  const [isOpenSideBar, setIsOpenSidebar] = useState(false);

  return (
    <>
      {/* Small Screen Navbar */}
      <div className=" text-gray-800 flex justify-between   px-3 p-2 md:hidden">
        <Logo />
        <AiOutlineMenu
          onClick={() => setIsOpenSidebar(!isOpenSideBar)}
          className="text-2xl cursor-pointer"
        />
      </div>

      {/* Large device Sidebar */}
      <div className={`hidden md:block `}>
        <SidebarContents />
      </div>

      {/* Small device menu toggle Sidebar */}
      <div
        className={`z-50 absolute top-0  transition-all duration-300 h-full 
       ${isOpenSideBar ? "left-0 opacity-100" : "opacity-0 -left-80"}`}
      >
        <SidebarContents />
      </div>
    </>
  );
};

export default Sidebar;
