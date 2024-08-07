import { Outlet } from "react-router-dom";
import NavBar from "../Components/Shared/Header/Header";

import { useTheme } from "next-themes";
import React from "react";
import Footer from "../module/shared/ui/Footer";
const Main = () => {
  const {theme} = useTheme()
  const themeColor = theme == 'dark'?'bg-bgDark':''
  return (
    <>
    <div className={`${themeColor}`}>
      <div className="px-3 md:px-0">
      <NavBar></NavBar>
     
      <div className="px-0 md:px-0">
      <Outlet></Outlet>
      </div>
    <Footer/>  

      </div>
    </div>
    </>
  );
};

export default Main;
