import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Foods from "../Pages/Foods/Foods";
import Blog from "../Pages/Blog/Blog";
import SignIn from "../Pages/Form/SignIn";
import SignUp from "../Pages/Form/SignUp";
import SinngleFoodPage from "../Pages/SingleFood/SinngleFoodPage";
import OrderFood from "../Pages/SingleFood/OrderFood";
import Profile from "../Pages/PersonalInfo/Profile";
import Added_Food from "../Pages/PersonalInfo/Added_Food";
import Page404 from "../Components/Shared/404/Page404";
import Guard from "../Components/Shared/Private/Guard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "food",
        element: <Foods/>
      },
      {
        path: "Blog",
        element: <Blog/>
      },
      {
        path: "/sign-in",
        element: <SignIn/>
      },
      {
        path: "/sign-up",
        element: <SignUp/>
      },
      {
        path: "/food-details/:id",
        element: <SinngleFoodPage/>
      },

      // User's personal info
      {
        path: "/order-food",
        element: <Guard><OrderFood></OrderFood></Guard>
      },
      {
        path: "/profile",
        element: <Profile/>
      },
      {
        path: "/added-food",
        element: <Added_Food/>
      },
      {
        path: "/add-food",
        element: <Added_Food/>
      },
],
},
// Catch-all route for 404
{
  path:'*',
  element: <Page404/>
},
]);

export default router;
