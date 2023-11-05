import {
      createBrowserRouter,
    } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home"
import Foods from "../Pages/Foods/Foods";
import Blog from "../Pages/Blog/Blog";


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
            }
        ]
      },
    ]);
    

    export default router