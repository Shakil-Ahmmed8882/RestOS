import { useState } from "react";

import React from "react";
import { adminRoutesArray } from "../data/adminRoutesArray";
import { DashboardSidebarItem } from "./DashboardSidebarItem.tsx";



export const DashboardAdminRoutes = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownClick = (dropdown) => {
    setOpenDropdown((prevDropdown) =>
      prevDropdown === dropdown ? null : dropdown
    );
  };

  return (
    <>
      <ul>
        {adminRoutesArray.map(({ label, icon, items, key }) => (
          <DashboardSidebarItem
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
