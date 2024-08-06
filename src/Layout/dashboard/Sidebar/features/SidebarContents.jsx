// @ts-nocheck
import { HiOutlineUsers } from "react-icons/hi2";
import { useState } from "react";

import MenuItem from "../components/MenuItem";
import { useNavigate } from "react-router-dom";

import { UserRoutes } from "./UserRoutes";
import { AdminRoutes } from "./AdminRoutes";
import React from "react";
import Logo from "../../../../shared/Logo";

export const SidebarContents = () => {
  const [activeRole, setActiveRole] = useState("user");

  const navigate = useNavigate();

  return (
    <>
      <div
        className={`  
        z-10 md:fixed flex-col
        justify-between 
        overflow-x-hidden
        w-72
        bg-[white]
        space-y-6
        px-2 py-4
        absolute inset-y-0
        transition-all
        transform md:translate-x-0
        
        ease-in-out`}
      >
        <div className="w-full flex justify-between  gap-3 items-end px-4 py-2">
          <Logo />
          <UserAvater />
        </div>
        <hr />

        {activeRole === "admin" && (
          <div className="flex gap-3 ">
            <button
              onClick={() => (
                setActiveRole("user"), navigate("/dashboard")
                // @ts-ignore
              )}
              className={` ${
                activeRole === "user"
                  ? "bg-primary-color  active:scale-90 text-[white]"
                  : "bg-[white]"
              }  transition-all duration-200 hover:shadow-lg  shadow-md p-3 rounded-lg px-10`}
            >
              User
            </button>
            <button
              onClick={() => (
                setActiveRole("admin"), navigate("/dashboard/manage-user")
              )}
              className={`${
                activeRole === "admin"
                  ? "bg-primary-color active:scale-90 text-[white]"
                  : "bg-[white]"
              } transition-all duration-200 hover:shadow-lg    shadow-md p-3 rounded-lg px-10`}
            >
              Admin
            </button>
          </div>
        )}

        {activeRole === "admin" ? (
          <>
            {/* <MenuItem
              label={"Manage user"}
              icon={HiOutlineUsers}
              address={"/dashboard/manage-user"}
            /> */}

             <AdminRoutes />
          </>
        ) : (
          <>
            <div>
              <ul>
                <UserRoutes />
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
