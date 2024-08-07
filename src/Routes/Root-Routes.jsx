import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";



import SignInLayout from "../module/login/layout/SignInLayout";
import SignUpLayout from "../module/logout/layout/SignUpLayout";
import HomeLayout from "../module/frontFace/home/layout/HomeLayout";
import DashboardLayout from "../Layout/dashboard/DashboardLayout";
import FAQ from "../module/frontFace/faq/features/FAQ";
import BlogPage from "../module/frontFace/blog/layout/Blog";
import BlogDetailPage from "../module/frontFace/blog/features/BlogDetails";
import RecipePageLayout from "../module/frontFace/recipe/layout/RecipePageLayout";
import RecipeDetailPage from "../module/frontFace/recipe/features/RecipeDetailsPage";
import FoodsLayout from "../module/frontFace/food/FoodsLayout";
import MyProfile from "../module/dashboard/userDashboard/profile/Profile";
import OrderLayout from "../module/dashboard/userDashboard/orders/OrderLayout";
import UserDashboardLayout from "../module/dashboard/userDashboard/dashboard/userDashboardLayout";
import AddFood from "../module/dashboard/adminDashboard/foodManagement/addFood/AddFood";
import FeaturedRecipes from "../module/dashboard/userDashboard/FeaturedRecipes/FeaturedRecipes";

import Allorders from "../module/dashboard/adminDashboard/foodManagement/allOrders/Allorders";
import PurchasedFoodsLayout from "../module/dashboard/userDashboard/purchases/PurchasedFoodsLayout";
import FoodDetails from "../module/frontFace/foodDetails/FoodsDetail";
import Page404 from "../shared/features/Page404";
import Private from "../shared/ui/Private";
import { routeGenerator } from "../Utils/routesGenerator";
import { userPaths } from "./UserRoutes";
import { homePagePaths } from "./homePageRoutes";
import { adminPaths } from "./adminRoutes";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <div>Error</div>,
    children: routeGenerator(homePagePaths)
  },

  // user dashboard
  {
    path: "/dashboard",
    element: <DashboardLayout/>,
    children: routeGenerator(userPaths)
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout/>,
    // <adminPrivate>..</adminPrivate>
    children: routeGenerator(adminPaths)
  },

  {
    path: "/sign-in",
    element: <SignInLayout />,
  },
  {
    path: "/sign-up",
    element: <SignUpLayout />,
  },
  // Catch-all route for 404
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;
