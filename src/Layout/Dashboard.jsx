import { Outlet } from "react-router-dom";
import { DashboardRoutes } from "../Components/Shared/dashboard/DashboardRoutes";
import { Profile } from "../Components/Shared/Profile/Profile";
import { DashboardNavbar } from "../Components/Shared/dashboard/DashboardNavbar";
import React from "react";

export const Dashboard = () => {

  
  return (
    <div className="flex min-h-screen w-full">
      <div className="w-72 min-h-screen  bg-[white]">
        <Profile />
        <DashboardRoutes />
      </div>
      <div className="bg-gradient-to-tr from-[#37ff00] to-[#09cd09] w-full">
        <DashboardNavbar />
        <Outlet />
      </div>
    </div>
  );
};
