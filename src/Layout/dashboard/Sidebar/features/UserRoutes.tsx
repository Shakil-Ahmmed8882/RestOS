
import React from "react";
import { userRoutesArray } from "../data/UserRoutes";
import MenuItem from "../components/MenuItem";

export const DashboardUserRoutes = () => {
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
