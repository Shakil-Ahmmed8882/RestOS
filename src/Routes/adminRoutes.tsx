import React from "react";
import PurchasedFoodsLayout from "../module/dashboard/userDashboard/purchases/PurchasedFoodsLayout";

import AllOrdersLayout from "../module/dashboard/adminDashboard/order-management/all-orders/AllOrders";
import AddFood from "../module/dashboard/adminDashboard/food-management/add-food/AddFood";
import { foodCategories } from "../demo-data/food";
import DisCountAndOffers from "../module/dashboard/adminDashboard/food-management/discountsAndOffers.tsx/DisCountAndOffers";
import FoodAnalytics from "../module/dashboard/adminDashboard/food-management/food-analytics/FoodAnalytics";
import AllUsers from "../module/dashboard/adminDashboard/user-management/all-users/AllUsers";
import UserActivityLog from "../module/dashboard/adminDashboard/user-management/user-activity-log/UserActivityLog";
import PendingOrders from "../module/dashboard/adminDashboard/order-management/pending-orders/PendingOrders";
import OrderHistory from "../module/dashboard/adminDashboard/order-management/order-histories/OrderHistory";
import AllPurchsedOrders from "../module/dashboard/adminDashboard/order-management/purchaed-orders/AllPurchsedOrders";
import AllBlogsLayout from "../module/dashboard/adminDashboard/blog-management/all-blogs/AllBlogsLayout";
import BlogCategories from "../module/dashboard/adminDashboard/blog-management/blog-categories/BlogCategories";
import AllBlogComments from "../module/dashboard/adminDashboard/blog-management/all-blog-comments/AllBlogComments";
import AdminAnalyticsPage from "../module/dashboard/adminDashboard/blog-management/blog-analytics/BlogAnalytics";
import AddRecipe from "../module/frontFace/recipe/features/AddRecipe";
import RecipeCategories from "../module/dashboard/adminDashboard/recipe-management/recipe-categories/RecipeCategories";
import AllRecipies from "../module/dashboard/adminDashboard/recipe-management/all-recipies/AllRecipies";
import AllFoodsLayout from "../module/dashboard/adminDashboard/food-management/all-foods/AllFoodsLayout";
import EditFoodLayout from "../module/dashboard/adminDashboard/food-management/all-foods/edit-food/EditFoodLayout";
import FoodCategoryLayout from "../module/dashboard/adminDashboard/food-management/food-categories/compoents/FoodCategoryLayout";
import Profile from "../module/dashboard/shared/profile/Profile";

export const adminPaths = [
  // USER MANAGEMENT
  {
    path: "/admin/dashboard",
    element: <AdminAnalyticsPage />, 
  },
  ,
  {
    path: "all-users",
    element: <AllUsers />,
  },

  {
    path: "activity-log",
    element: <UserActivityLog />,
  },

  // FOOD MANAGEMENT
  {
    path: "all-foods",
    element: <AllFoodsLayout />,
  },
  {
    path: "add-food",
    element: <AddFood />,
  },
  {
    path: "categories",
    element: <FoodCategoryLayout/>,
  },
  {
    path: "discounts",
    element: <DisCountAndOffers />,
  },
  {
    path: "all-foods/edit/food",
    element: <EditFoodLayout />,
  },
  // // ORDERS MANAGEMENT
  {
    path: "all-orders",
    element: <AllOrdersLayout/>,
  },
  {
    path: "pending-orders",
    element: <PendingOrders />,
  },
  {
    path: "purchaed-orders",
    element: <AllPurchsedOrders />,
  },
  {
    path: "order-history",
    element: <OrderHistory />,
  },

  // BLOG MANAGEMENT
  {
    path: "all-blog-posts",
    element: <AllBlogsLayout />,
  },
  {
    path: "blog-categories",
    element: <BlogCategories />,
  },
  // {
  //   path: "blog-comments",
  //   element: <AllBlogComments />,
  // },
  {
    path: "blog-analytics",
    element: <AdminAnalyticsPage />,
  },

  // RECIPE MANAGEMENT
  {
    path: "all-recipes",
    element: <AllRecipies />,
  },
  {
    path: "add-recipe",
    element: <AddRecipe />,
  },
  {
    path: "recipe-categories",
    element: <RecipeCategories />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
];
