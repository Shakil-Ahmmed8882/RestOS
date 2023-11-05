import {
      createBrowserRouter,
    } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home"
import Foods from "../Pages/Foods/Foods";
import Blog from "../Pages/Blog/Blog";
import SignIn from "../Pages/Form/SignIn";
import SignUp from "../Pages/Form/SignUp";


    const router = createBrowserRouter([
      {
        path: "/",
        element:<Main></Main>,
        errorElement:<div>Error</div>,
        children:[
            {
                  index:true,
                  element:<Home></Home>
            },
            {
                  path:'food',
                  element:<Foods></Foods>
            },
            {
                  path:'Blog',
                  element:<Blog></Blog>
            },
            {
              path:'/sign-in',
              element:<SignIn></SignIn>
        },
            {
              path:'/sign-up',
              element:<SignUp></SignUp>
        }
        ]
      },
    ]);
    

    export default router