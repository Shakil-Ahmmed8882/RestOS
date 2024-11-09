import React from "react";

import OrderLayout from "../module/dashboard/userDashboard/orders/OrderLayout";
import PurchasedFoodsLayout from "../module/dashboard/userDashboard/purchases/PurchasedFoodsLayout";
import FeaturedRecipes from "../module/dashboard/userDashboard/FeaturedRecipes/FeaturedRecipes";
import UserDashboardLayout from "../module/dashboard/userDashboard/dashboard/UserDashboardLayout";
import Profile from "../module/dashboard/shared/profile/Profile";

export const userPaths = [
  {
    name: "Dashboard",
    path: "/dashboard",
    element: <UserDashboardLayout />,
  },
  {
    name: "Profile",
    path: "user/profile",
    element: <Profile />,
  },
  {
    name: "Featured Recipes",
    path: "user/featured-recipes",
    element: <FeaturedRecipes />,
  },
  {
    name: "Orders",
    path: "user/orderlist",
    element: <OrderLayout />,
  },
  {
    name: "Purchases",
    path: "user/purchasedList",
    element: <PurchasedFoodsLayout />,
  },
];
