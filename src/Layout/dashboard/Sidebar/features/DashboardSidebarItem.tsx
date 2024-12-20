import React from "react";

import { DownArrowIcon } from "../../../../assets/icons/Icons";
import MenuItem from "../components/MenuItem";

export const DashboardSidebarItem = ({
  handleClick,
  icon: Icon,
  label,
  isOpen,
  sidebarDropdowns,
}) => {
  return (
    <>
      <li
        onClick={() => handleClick(!isOpen)}
        className={`${
          isOpen ? "font-semibold text-[#3b3b3b]" : ""
        }   transition-all duration-500 flex cursor-pointer px-4 py-2 mt-3 items-center`}
      >
        <Icon className="text-gray-400" />

        <span className="ml-2 text-sm">{label}</span>
        <DownArrowIcon
          className={`${
            isOpen && "rotate-180"
          } transition-all duration-500 text-gray-400 ml-auto`}
        />
      </li>

      <ul
        className={`pb-8 ${
          isOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
        } transition-all duration-300 overflow-hidden ml-4`}
      >
        {/* Dropdown */}
        {sidebarDropdowns?.map((item, index) => (
          <MenuItem label={item.name} address={item?.address} icon={""} key={index} />
        ))}
      </ul>
    </>
  );
};
