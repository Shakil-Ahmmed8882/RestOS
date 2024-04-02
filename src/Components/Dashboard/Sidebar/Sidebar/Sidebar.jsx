// Components
import Logo from "../../../Shared/Logo";
// Icons

import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { MySidebar } from "./MySidebar";

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

      {/* Sidebar */}
      <div className={`z-50 absolute top-0  transition-all duration-300 h-full 
       ${isOpenSideBar? "left-0 opacity-100":"opacity-0 -left-80"}`}>
      <MySidebar />
      </div>
      <div className={`hidden md:block `}>
      <MySidebar />
      </div>
    </>
  );
};

export default Sidebar;
