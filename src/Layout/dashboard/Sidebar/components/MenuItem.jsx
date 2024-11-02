import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === address;

  return (
    <NavLink
      to={address}
      end
      className={`flex items-center px-4 py-2  my-5 transition-colors duration-300 transform  hover:bg-[#efefef] ${
        isActive ? " bg-[#f8fff9] shadow-xl shadow-[#f7fef8] " : "text-[#8a8a8a]"
      }`}
    >
      <li className="flex items-center px-4 py-2">
        {Icon ? (
          <Icon
            className={`font-bold ${
              isActive ? "font-bold text-primaryColor" : "text-gray-400"
            } text-[21px]`}
          />
        ) : (
          <span className="bg-primary-color w-2 h-2 rounded-full"></span>
        )}
        <span className="ml-2 ">{label}</span>
      </li>
    </NavLink>
  );
};

export default MenuItem;
