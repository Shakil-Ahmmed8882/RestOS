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
import ProtectedRoutes from "../shared/ui/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <div>Error</div>,
    children: routeGenerator(homePagePaths),
  },

  // user dashboard
  {
    path: "/user/dashboard",
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: routeGenerator(userPaths),
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    // <adminPrivate>..</adminPrivate>
    children: routeGenerator(adminPaths),
  },

  // ------------------ common dashboard routes ----------------------------

  {
    path: "/",
    element: <Main />,
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
