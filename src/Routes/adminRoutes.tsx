import React from "react";
import PurchasedFoodsLayout from "../module/dashboard/userDashboard/purchases/PurchasedFoodsLayout";
import AllFoods from "../module/dashboard/adminDashboard/food-management/all-foods/AddFood";
import Allorders from "../module/dashboard/adminDashboard/order-management/allOrders/Allorders";
import AddFood from "../module/dashboard/adminDashboard/food-management/add-food/AddFood";
import FoodCategories from "../module/dashboard/adminDashboard/food-management/food-categories/FoodCategories";
import DisCountAndOffers from "../module/dashboard/adminDashboard/food-management/discountsAndOffers.tsx/DisCountAndOffers";
import FoodAnalytics from "../module/dashboard/adminDashboard/food-management/food-analytics/FoodAnalytics";
import AllUsers from "../module/dashboard/adminDashboard/user-management/all-users/AllUsers";
import UserActivityLog from "../module/dashboard/adminDashboard/user-management/user-activity-log/UserActivityLog";
import PendingOrders from "../module/dashboard/adminDashboard/order-management/pending-orders/PendingOrders";
import OrderHistory from "../module/dashboard/adminDashboard/order-management/order-histories/OrderHistory";
import AllPurchsedOrders from "../module/dashboard/adminDashboard/order-management/purchaed-orders/AllPurchsedOrders";
import AllBlogs from "../module/dashboard/adminDashboard/blog-management/all-blogs/AllBlogs";
import BlogCategories from "../module/dashboard/adminDashboard/blog-management/blog-categories/BlogCategories";
import AllBlogComments from "../module/dashboard/adminDashboard/blog-management/all-blog-comments/AllBlogComments";
import BlogAnalytics from "../module/dashboard/adminDashboard/blog-management/blog-analytics/BlogAnalytics";
import AddRecipe from "../module/frontFace/recipe/features/AddRecipe";
import RecipeCategories from "../module/dashboard/adminDashboard/recipe-management/recipe-categories/RecipeCategories";
import AllRecipies from "../module/dashboard/adminDashboard/recipe-management/all-recipies/AllRecipies";

export const adminPaths = [
  // USER MANAGEMENT
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
    element: <AllFoods />,
  },
  {
    path: "add-food",
    element: <AddFood />,
  },
  {
    path: "categories",
    element: <FoodCategories />,
  },
  {
    path: "discounts",
    element: <DisCountAndOffers />,
  },
  {
    path: "analytics",
    element: <FoodAnalytics />,
  },

  // // ORDERS MANAGEMENT
  {
    path: "all-orders",
    element: <Allorders></Allorders>,
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
    element: <AllBlogs />,
  },
  {
    path: "all-blog-posts",
    element: <AllBlogs />,
  },
  {
    path: "blog-categories",
    element: <BlogCategories />,
  },
  {
    path: "blog-comments",
    element: <AllBlogComments />,
  },
  {
    path: "blog-analytics",
    element: <BlogAnalytics />,
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
];
