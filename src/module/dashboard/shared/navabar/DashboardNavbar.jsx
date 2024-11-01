import React from "react";
import Search from "../../../shared/ui/Search";
import UserAndNotification from "./UserAndNotification";


const DashboardNavbar = () => {
    return (
        <>

            <div className="hidden md:flex justify-between p-2 rounded-lg shadow-sm bg-gradient-to-r from-[#ffffff] to-[#fdfffe] mb-5 gap-6 items-center">
                <h1 className="font-bold text-2xl">Dashboard</h1>
                <Search />
                <UserAndNotification/>
            </div>
            

        </>
    );
};
export default DashboardNavbar
