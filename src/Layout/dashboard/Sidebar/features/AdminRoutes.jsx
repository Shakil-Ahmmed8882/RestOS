import { useState } from "react";
import { SidebarItem } from "./SidebarItem";
import React from "react";
import { adminRoutesArray } from "../data/adminRoutesArray";

export const AdminRoutes = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownClick = (dropdown) => {
    setOpenDropdown((prevDropdown) =>
      prevDropdown === dropdown ? null : dropdown
    );
  };

  return (
    <>
      <div className="mt-6 mb-2 px-4 font-semibold text-md">FOLDERS</div>
      <ul>
        {adminRoutesArray.map(({ label, icon, items, key }) => (
          <SidebarItem
            key={key}
            handleClick={() => handleDropdownClick(key)}
            icon={icon}
            label={label}
            isOpen={openDropdown === key}
            sidebarDropdowns={items}
          />
        ))}
      </ul>
    </>
  );
};
