import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Foods from "../Pages/Foods/Foods";
import SignIn from "../Pages/Form/SignIn";
import SignUp from "../Pages/Form/SignUp";
import SinngleFoodPage from "../Pages/SingleFood/SinngleFoodPage";
import OrderFood from "../Pages/SingleFood/OrderFood";
import Profile from "../Pages/Dashboard/user/profile/Profile";

import Page404 from "../Components/Shared/404/Page404";
import Guard from "../Components/Shared/Private/Guard";

import AllMenu from "../Pages/Home/Home/AllMenu";
import UpdateFood from "../Pages/Dashboard/Admin/update-food/UpdateFood";
import MobileBreadCrump from "../Components/Shared/Header/MobileBreadCrump";

import AllOrders from "../Pages/Dashboard/Admin/all-orders/AllOrders";

import DashboardLayout from "../Layout/DashboardLayout";
import PrivateRoute from "./PrivateRoutes";
import { ManageUser } from "../Pages/Dashboard/Admin/Users/ManageUsers";
import UserDashboard from "../Pages/Dashboard/user/user-dashboard/userDashboard";
import FAQ from "../Pages/FAQ/FAQ";
import BlogPage from "../Pages/blog-post/blog/Blog";
import BlogDetailPage from "../Pages/blog-post/blog/BlogDetails";
import RecipePage from "../Pages/Recipe/RecipePage";
import RecipeDetailPage from "../Pages/Recipe/RecipeDetailsPage";
import AllPurchasedPage from "../Pages/Dashboard/Admin/all-purchased-foods/AllPurchasedList";

import Added_Food from "../Pages/Dashboard/Admin/recently-added-foods/Added_Food";
import Add_Food from "../Pages/Dashboard/Admin/add-food/Add_Food";
import SingleUserOrderList from "../Pages/Dashboard/user/order-history/SingleUserOrderList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "food",
        element: <Foods />,
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
        element: <BlogDetailPage />,
      },
      // ============= Blog ends ===============

      // ============= Recipe starts ===============
      {
        path: "recipe/new",
        element: <RecipePage />,
      },

      {
        path: "recipe/:id",
        element: <RecipeDetailPage />,
      },
      // ============= Recipe ends ===============
      {
        path: "/food-details/:id",
        element: (
          <Guard>
            <SinngleFoodPage />
          </Guard>
        ),
      },

      // User's personal info
      {
        path: "/order-food/:id",
        element: (
          <Guard>
            <OrderFood></OrderFood>
          </Guard>
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
        element: <Add_Food />,
      },
      {
        path: "/all-menu",
        element: <AllMenu></AllMenu>,
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
        element: <AllPurchasedPage></AllPurchasedPage>,
      },
    ],
  },

  // user dashboard
  {
    path: "/dashboard",
    element: (
      <>
        <DashboardLayout />
      </>
    ),
    children: [
      {
        index: true,
        element: (
          <>
            <UserDashboard />
          </>
        ),
      },
      {
        path: "user/profile",
        element: <Profile />,
      },
      {
        path: "user/orderlist",
        element: <SingleUserOrderList />,
      },
      {
        path: "user/purchasedList",
        element: <AllPurchasedPage />,
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
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  // Catch-all route for 404
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;
