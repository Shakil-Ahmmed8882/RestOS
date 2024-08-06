import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import OrderFood from "../Pages/DetailFood/OrderFood";

import Page404 from "../Components/Shared/404/Page404";
import Private from "../Components/Shared/Private/Private";

import UpdateFood from "../Pages/Dashboard/Admin/update-food/UpdateFood";
import MobileBreadCrump from "../Components/Shared/Header/MobileBreadCrump";

import AllOrders from "../Pages/Dashboard/Admin/all-orders/AllOrders";


import PrivateRoute from "./PrivateRoutes";
import { ManageUser } from "../Pages/Dashboard/Admin/Users/ManageUsers";

import PurchaseList from "../Pages/Dashboard/Admin/all-purchased-foods/PurchaseList";

import Added_Food from "../Pages/Dashboard/Admin/recently-added-foods/Added_Food";
import FoodDetails from "../Pages/DetailFood/FoodsDetail";
import React from "react";

import PracticeTable from "../../X";


import SignInLayout from "../module/login/layout/SignInLayout";
import SignUpLayout from "../module/logout/layout/SignUpLayout";
import HomeLayout from "../module/frontFace/home/layout/HomeLayout";
import FAQ from "../module/frontFace/faq/features/FAQ";
import BlogPage from "../module/frontFace/blog/layout/Blog";
import BlogDetailPage from "../module/frontFace/blog/features/BlogDetails";
import RecipePageLayout from "../module/frontFace/recipe/layout/RecipePageLayout";
import RecipeDetailPage from "../module/frontFace/recipe/features/RecipeDetailsPage";
import FoodsLayout from "../module/frontFace/food/FoodsLayout";
import DashboardLayout from "../Layout/dashboard/DashboardLayout";
import MyProfile from "../module/dashboard/userDashboard/profile/Profile";
import OrderLayout from "../module/dashboard/userDashboard/orders/OrderLayout";
import PurchasedFoodsLayout from "../module/dashboard/userDashboard/purchases/PurchasedFoodsLayout";
import UserDashboardLayout from "../module/dashboard/userDashboard/dashboard/userDashboardLayout";
import AddFood from "../module/dashboard/adminDashboard/foodManagement/addFood/AddFood";
import FeaturedRecipes from "../module/dashboard/userDashboard/FeaturedRecipes/FeaturedRecipes";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <HomeLayout />,
      },
      {
        path: "food",
        element: <FoodsLayout />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      // ============= Blog start ===============
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/:id",
        element: <BlogDetailPage match={undefined} />,
      },
      // ============= Blog ends ===============

      // ============= Recipe starts ===============
      {
        path: "recipe/new",
        element: <RecipePageLayout />,
      },

      {
        path: "recipe/:id",
        element: <RecipeDetailPage />,
      },
      // ============= Recipe ends ===============
      {
        path: "/food-details/:id",
        element: (
          <Private>
            <FoodDetails />
          </Private>
        ),
      },

      // User's personal info
      {
        path: "/order-food/:id",
        element: (
          <Private>
            <OrderFood></OrderFood>
          </Private>
        ),
      },
      {
        path: "/added-food",
        element: <Added_Food />,
      },
      {
        path: "/update-food/:id",
        element: <UpdateFood />,
      },
      {
        path: "/add-food",
        element: <AddFood />,
      },
      {
        path: "/all-menu",
        element: <h1>Menu</h1>,
      },
      {
        path: "/mobile-bradcrump",
        element: <MobileBreadCrump></MobileBreadCrump>,
      },

      //admin
      {
        path: "/admin/Allorderlist",
        element: <AllOrders></AllOrders>,
      },
      {
        path: "/all-purchased-list",
        element: <PurchasedFoodsLayout></PurchasedFoodsLayout>,
      },
    ],
  },

  // user dashboard
  {
    path: "/dashboard",
    element: (
      <>
        <DashboardLayout/>
      </>
    ),
    children: [
      {
        index: true,
        element: (
          <>
            <UserDashboardLayout />
          </>
        ),
      },
      {
        path: "user/profile",
        element: <MyProfile />,
      },
      {
        path: "user/orderlist",
        element: <OrderLayout />,
      },
      {
        path: "user/purchasedList",
        element: <PurchaseList />,
      },
      {
        path: "user/featured-recipes",
        element: <FeaturedRecipes />,
      },

      // Admin routes
      {
        path: "manage-user",
        element: (
          <PrivateRoute>
            <ManageUser />
          </PrivateRoute>
        ),
      },
    ],
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
  {
    path: "/x",
    element: <PracticeTable />,
  },
]);

export default router;
