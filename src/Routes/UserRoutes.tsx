import React from "react";

import OrderAndPurchaseLayout from "../module/dashboard/userDashboard/orders/OrderAndPurchaseLayout";
import PurchasedFoodsLayout from "../module/dashboard/userDashboard/purchases/PurchasedFoodsLayout";
import FeaturedRecipes from "../module/dashboard/userDashboard/FeaturedRecipes/FeaturedRecipes";
import UserDashboardLayout from "../module/dashboard/userDashboard/dashboard/UserDashboardLayout";
import Profile from "../module/dashboard/shared/profile/Profile";
import MyBlogs from "../module/dashboard/userDashboard/my-blogs/MyBlogs";
import SavedBlogsLayout from "../module/frontFace/saved-blogs/SavedBlogsLayout";


export const userPaths = [
  {
    name: "Dashboard",
    path: "/user/dashboard",
    element: <UserDashboardLayout />,
  },
  {
    name: "Profile",
    path: "profile",
    element: <Profile />,
  },
  {
    name: "Featured Recipes",
    path: "featured-recipes",
    element: <FeaturedRecipes />,
  },
  {
    name: "Orders",
    path: "orderlist",
    element: <OrderAndPurchaseLayout />,
  },
  {
    name: "Purchases",
    path: "purchasedList",
    element: <PurchasedFoodsLayout />,
  },
  {
    path: "my-blogs",
    element: <MyBlogs />,
  },
  {
    path: "saved-blogs",
    element: <SavedBlogsLayout/>,  },
];
