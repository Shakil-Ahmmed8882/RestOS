import React from "react";
import { createBrowserRouter } from "react-router-dom";
import {
  Main,
  routeGenerator,
  homePagePaths,
  DashboardLayout,
  userPaths,
  adminPaths,
  SignInLayout,
  SignUpLayout,
  Page404,
  commonRoutes,
} from ".";
import RecipePage from "../../X";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <div>Error</div>,
    children: routeGenerator(homePagePaths),
  },

  // user dashboard
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: routeGenerator(userPaths),
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    // <adminPrivate>..</adminPrivate>
    children: routeGenerator(adminPaths),
  },

  // ------------------ common dashboard routes ----------------------------

  {
    path: "/dashboard/common",
    element: <DashboardLayout />,
    children: routeGenerator(commonRoutes),
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
  // test route
  {
    path: "x",
    element: <RecipePage />,
  },
]);

export default router;
