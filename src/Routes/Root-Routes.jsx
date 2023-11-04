import {
      createBrowserRouter,
    } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home"


    const router = createBrowserRouter([
      {
        path: "/",
        element:<Main></Main>,
        errorElement:<div>Error</div>,
        children:[
            {
                  path:'/',
                  element:<Home></Home>
            }
        ]
      },
    ]);
    

    export default router