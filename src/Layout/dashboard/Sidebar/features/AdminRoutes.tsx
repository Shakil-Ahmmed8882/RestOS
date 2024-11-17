import { useState } from "react";

import React from "react";
import { adminNestedRoutesArray, adminSidebarDirectRoutes } from "../data/adminRoutesArray";
import { DashboardSidebarItem } from "./DashboardSidebarItem.tsx";
import MenuItem from "../components/MenuItem.tsx";



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

     
        {adminNestedRoutesArray.map(({ label, icon, items, key }) => (
          <DashboardSidebarItem
            key={key}
            handleClick={() => handleDropdownClick(key)}
            icon={icon}
            label={label}
            isOpen={openDropdown === key}
            sidebarDropdowns={items}
          />
        ))}


              {/* User routes  */}
      {adminSidebarDirectRoutes?.map((route) => (
        <MenuItem
          label={route.label}
          icon={route.icon}
          address={route.address}
        />
      ))}
      </ul>
    </>
  );
};


