import { HiOutlineUsers } from "react-icons/hi2";
import { useState } from "react";

import MenuItem from "../MenuItem";
import { useNavigate } from "react-router-dom";
import RestaurantLogo from "../../../Shared/X";
import { UserRoutes } from "./UserRoutes";
import { AdminRoutes } from "./AdminRoutes";
import React from "react";




export const MySidebar = () => {

  const [activeRole, setActiveRole] = useState('admin')

  const navigate = useNavigate()

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
        <div>
          <div className="flex">
            <div className="w-full flex justify-between  gap-3 items-end px-4 py-2">
              <RestaurantLogo />
              <div>
                <p className="text-[#a7a7a7]">inc</p>
                <h3 className="font-semibold font-"> </h3>
              </div>
              <div>
                <p className="w-7 h-7 flex justify-center items-center rounded-full bg-primary-color z-10 ">
                  <img className=" w-6 h-6 rounded-full object-cover" src="https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />

        {
          activeRole === 'admin' &&
          <div className="flex gap-3 ">
            <button onClick={() => (
              setActiveRole('user'), navigate('/dashboard')
            )} className={` ${activeRole === 'user' ? 'bg-primary-color  active:scale-90 text-[white]' : 'bg-[white]'}  transition-all duration-200 hover:shadow-lg  shadow-md p-3 rounded-lg px-10`}>User</button>
            <button onClick={() => (
              setActiveRole('admin'),
              navigate('/dashboard/manage-user')
            )} className={`${activeRole === 'admin' ? 'bg-primary-color active:scale-90 text-[white]' : 'bg-[white]'} transition-all duration-200 hover:shadow-lg    shadow-md p-3 rounded-lg px-10`}>Admin</button>
          </div>
        }

        {
          activeRole === 'admin' ?
            <>
              <MenuItem label={'Manage user'} icon={HiOutlineUsers} address={'/dashboard/manage-user'} />
            </>
            :
            <>
              <div>
                <ul>
                  <UserRoutes />
                </ul>
                {
                  activeRole === 'admin' && <AdminRoutes />
                }
              </div>


            </>
        }

      </div>
    </>
  );
};
