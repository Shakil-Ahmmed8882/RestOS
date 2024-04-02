import { Outlet } from "react-router-dom";
import { DashboardRoutes } from "../Components/Shared/dashboard/DashboardRoutes";
import { Profile } from "../Components/Shared/Profile/Profile";
import { DashboardNavbar } from "../Components/Shared/dashboard/DashboardNavbar";

export const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="w-72 min-h-screen  bg-[white]">
        <Profile />
        <DashboardRoutes />
      </div>
      <div className="bg-gradient-to-tr from-[#f5f5f5] to-[#f7fff9] w-full">
        <DashboardNavbar />
        <Outlet />
      </div>
    </div>
  );
};
