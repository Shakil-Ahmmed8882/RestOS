import React from "react";
import MyProfile from "../module/dashboard/userDashboard/profile/Profile";
import UserDashboardLayout from "../module/dashboard/userDashboard/dashboard/userDashboardLayout";
import OrderLayout from "../module/dashboard/userDashboard/orders/OrderLayout";
import PurchasedFoodsLayout from "../module/dashboard/userDashboard/purchases/PurchasedFoodsLayout";
import FeaturedRecipes from "../module/dashboard/userDashboard/FeaturedRecipes/FeaturedRecipes";

export const userPaths = [
  {
    name: "Dashboard",
    path: "/dashboard",
    element: <UserDashboardLayout />,
  },
  {
    name: "Profile",
    path: "user/profile",
    element: <MyProfile />,
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
