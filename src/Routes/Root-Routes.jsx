import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import MobileBreadCrump from "../Components/Shared/Header/MobileBreadCrump";


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
import UserDashboardLayout from "../module/dashboard/userDashboard/dashboard/userDashboardLayout";
import AddFood from "../module/dashboard/adminDashboard/foodManagement/addFood/AddFood";
import FeaturedRecipes from "../module/dashboard/userDashboard/FeaturedRecipes/FeaturedRecipes";
import X from "../../X";
import Allorders from "../module/dashboard/adminDashboard/foodManagement/allOrders/Allorders";
import PurchasedFoodsLayout from "../module/dashboard/userDashboard/purchases/PurchasedFoodsLayout";
import Private from "../Components/Shared/Pagination/Private/Private";
import FoodDetails from "../module/frontFace/foodDetails/FoodsDetail";
import Page404 from "../shared/features/Page404";




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
        path: "/admin/all-orders",
        element: <Allorders></Allorders>,
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
        element: <PurchasedFoodsLayout />,
      },
      {
        path: "user/featured-recipes",
        element: <FeaturedRecipes />,
      },

      // Admin routes
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
    element: <X />,
  },
]);

export default router;
