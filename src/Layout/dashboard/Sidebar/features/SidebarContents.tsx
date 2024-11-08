// @ts-nocheck
import { HiOutlineUsers } from "react-icons/hi2";
import { useState } from "react";

import MenuItem from "../components/MenuItem";
import { useNavigate } from "react-router-dom";

import { DashboardUserRoutes } from "./UserRoutes";
;
import React from "react";
import Logo from "../../../../shared/ui/Logo";
import { DashboardAdminRoutes } from "./AdminRoutes";

export const SidebarContents = () => {
  const [role, setRole] = useState("admin");


  return (
    <>
      <div
        className={`  
        z-10 md:fixed flex-col
        justify-between 
        overflow-x-hidden
        w-72
        bg-[#ffffff]
        space-y-6
        px-2 py-4
        absolute inset-y-0
        transition-all
        transform md:translate-x-0
        ease-in-out`}
      >
        <div className="w-full rounded-xl text-[white] flex justify-between  gap-3 items-end px-4">
          {/* <Logo /> */}
          {/* <UserAvater /> */}
        </div>
        

        {role === "admin" ? (
          <>
             <DashboardAdminRoutes />
          </>
        ) : (
          <>
            <div>
              <ul>
          <DashboardUserRoutes />
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const UserAvater = () => {
  return (
    <div>
      <p className="w-7 h-7 flex justify-center items-center rounded-full bg-primary-color z-10 ">
        <img
          className=" w-6 h-6 rounded-full object-cover"
          src="https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </p>
    </div>
  );
};
