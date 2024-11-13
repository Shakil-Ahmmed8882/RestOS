import { SidebarContents } from "./features/SidebarContents";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";

const Sidebar = () => {
  const menuOpen = useAppSelector((state) => state.menu.dashboardMenuOpen);

  return (
    <>

      {/* Large device Sidebar */}
      <div className={`hidden md:block `}>
        <SidebarContents />
      </div>

      {/* Small device menu toggle Sidebar */}
      <div
        className={`z-50 absolute top-0  transition-all duration-300 h-full 
       ${menuOpen ? "left-0 opacity-100" : "opacity-0 -left-80"}`}
      >
        <SidebarContents />
      </div>
    </>
  );
};

export default Sidebar;
