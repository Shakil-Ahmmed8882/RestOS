import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import DashboardNavbar from "../../Pages/Dashboard/navabar/DashboardNavbar";
import React from "react";

const DashboardLayout = () => {
  // const NotProfilePage = useLocation().pathname !== '/dashboard/user/profile'
  // const NotFeaturedRecipesPage = useLocation().pathname !== '/dashboard/user/featured-recipes'

  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar />
      <div className="flex-1 md:ml-72">
        <div className="p-3">
          <DashboardNavbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
