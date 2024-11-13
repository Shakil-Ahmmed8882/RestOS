
import React from "react";
import { userRoutes } from "../data/userRoutes.ts";
import MenuItem from "../components/MenuItem";

export const DashboardUserRoutes = () => {
  return (
    <>
      {/* User routes  */}
      {userRoutes?.map((route) => (
        <MenuItem
          label={route.label}
          icon={route.icon}
          address={route.address}
        />
      ))}
    </>
  );
};
