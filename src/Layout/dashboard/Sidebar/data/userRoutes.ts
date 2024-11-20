import { CgProfile } from "react-icons/cg";
import { BiPurchaseTag } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import { AiOutlineDashboard } from "react-icons/ai";




export const userRoutes = [
    {label:"Dashboard", icon:AiOutlineDashboard, address: `/dashboard`},
    {label:"Profile", icon:CgProfile, address: `/user/dashboard/profile`},
    {label:"Featured Recipes", icon:BiPurchaseTag, address: `/dashboard/user/featured-recipes`},
    {label:"Order List", icon:CiBoxList, address: `/dashboard/user/orderlist`},
    {label:"My Blogs", icon:BiPurchaseTag, address: `/dashboard/user/my-blogs`},
  ]

