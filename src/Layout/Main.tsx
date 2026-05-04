import { Outlet } from "react-router-dom";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import Footer from "../module/shared/ui/Footer";
import DrawerNavigation from "../shared/navigation/DrawerNavigation";
import Navbar from "../shared/navigation/Navbar";
import useHandleScroll from "../🔗Hook/useHandleScroll";
import { useSmoothScroll } from "../shared/smooth-scroll/useSmoothScroll";

const Main = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [scrollPosition, setScrollPosition] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

  useSmoothScroll();
  useHandleScroll(setShowNavbar, setScrollPosition, scrollPosition);

  return (
    <div className={dark ? "bg-gray-950 text-white" : "bg-white text-gray-900"}>
      <div
        className={`flex items-center sticky top-0 z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Navbar />
        <DrawerNavigation />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
