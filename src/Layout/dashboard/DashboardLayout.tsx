import { Outlet} from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

import React from "react";
import DashboardNavbar from "../../module/dashboard/shared/navabar/DashboardNavbar";
import Footer from "../../module/shared/ui/Footer";


const DashboardLayout = () => {
  // const NotProfilePage = useLocation().pathname !== '/dashboard/user/profile'
  // const NotFeaturedRecipesPage = useLocation().pathname !== '/dashboard/user/featured-recipes'

  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar />
      <div className="flex-1 md:ml-72">
        <div className="p-3">
          <DashboardNavbar/>
          <Outlet />
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
