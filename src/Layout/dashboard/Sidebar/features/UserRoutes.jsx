import MenuItem from "../../Sidebar/components/MenuItem";
import React from "react";
import { userRoutesArray } from "../data/UserRoutes";

export const UserRoutes = () => {
  return (
    <>
      {/* User routes  */}
      {userRoutesArray?.map((route) => (
        <MenuItem
          label={route.label}
          icon={route.icon}
          address={route.address}
        />
      ))}
    </>
  );
};
