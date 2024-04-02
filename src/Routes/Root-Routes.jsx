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
import Add_Food from "../Pages/PersonalInfo/Add_Food";
import OrderList from "../Pages/Order-list/OrderList";
import AllMenu from "../Pages/Home/Home/AllMenu";
import AddedFoodUpdate from "../Pages/PersonalInfo/AddedFoodUpdate/AddedFoodUpdate";
import MobileBreadCrump from "../Components/Shared/Header/MobileBreadCrump";
import PurchasedPage from "../Pages/SingleFood/PurchasedPage";
import AllOrders from "../Pages/Admin/AllOrders";
import AllPurchasedPage from "../Pages/Admin/AllPurchasedList";
import { Dashboard } from "../Layout/Dashboard";


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
        element: <Guard><SinngleFoodPage/></Guard>
      },

      // User's personal info
      {
        path: "/order-food/:id",
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
        path: "/food-update/:id",
        element: <AddedFoodUpdate/>
      },
      {
        path: "/add-food",
        element: <Add_Food/>
      },
      {
        path: "/orderlist",
        element: <OrderList/>
      },
      {
        path: "/purchasedList",
        element: <PurchasedPage/>
      },
      {
        path:'/all-menu',
        element:<AllMenu></AllMenu>
      },
      {
        path:'/mobile-bradcrump',
        element:<MobileBreadCrump></MobileBreadCrump>
      },
      
      //admin
      {
        path:'/Allorderlist',
        element:<AllOrders></AllOrders>
      },
      {
        path:'/all-purchased-list',
        element:<AllPurchasedPage></AllPurchasedPage>
      }
],
},

// user dashboard 
{
path:"/dashboard",
element:<Dashboard/>
},
// Catch-all route for 404
{
  path:'*',
  element: <Page404/>
},
]);

export default router;
