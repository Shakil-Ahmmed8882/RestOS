import { Outlet } from "react-router-dom";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import Footer from "../module/shared/ui/Footer";
import DrawerNavigation from "../shared/navigation/DrawerNavigation";
import Navbar from "../shared/navigation/Navbar";
import useHandleScroll from "../🔗Hook/useHandleScroll";

const Main = () => {
  const { theme } = useTheme();
  const themeColor = theme === "dark" ? "bg-bgDark" : "";

  const [scrollPosition, setScrollPosition] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

  // conditional navigation based on scroll
  useHandleScroll(setShowNavbar, setScrollPosition, scrollPosition);

  return (
    <div className={`${themeColor}`}>
      <div className="px-3 md:px-0">
        <div
          className={`flex items-center sticky top-0 z-50  transition-transform duration-300 ${
            showNavbar ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <Navbar />
          <DrawerNavigation />
        </div>
        <div className="px-0 md:px-0">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
