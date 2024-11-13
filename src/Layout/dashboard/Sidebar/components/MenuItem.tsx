import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === address;

  return (
    <NavLink
      to={address}
      end
      className={`flex items-center px-4 py-2  my-5 transition-colors duration-300 transform  hover:bg-[#fafafa] group  ${
        isActive ? " bg-[#ffffff]" : "text-[#8a8a8a]"
      }`}
    >
      <li className="flex items-center px-4 py-2">
        {Icon ? (
          <Icon
            className={`font-bold  ${
              isActive ? "font-bold text-primaryColor" : "text-[#bebebe] group-hover:text-[#797979] transition-all duration-400"
            } text-[21px]`}
          />
        ) : (
          <span className={`${   isActive ? "font-bold bg-primary-color" : "bg-[#b9b9b9]"}  w-2 h-2 rounded-full`}></span>
        )}
        <span className={`ml-3 ${isActive ? " text-primaryColor" : "text-[#bebebe]  group-hover:text-[#797979]"} transition-all duration-400`}>{label}</span>
      </li>
    </NavLink>
  );
};

export default MenuItem;
