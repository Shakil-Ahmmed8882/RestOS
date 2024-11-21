import { CgProfile } from "react-icons/cg";
import { BiPurchaseTag } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import { AiOutlineDashboard } from "react-icons/ai";




export const userRoutes = [
    {label:"Dashboard", icon:AiOutlineDashboard, address: `/user/dashboard`},
    {label:"Profile", icon:CgProfile, address: `/user/dashboard/profile`},
    {label:"Featured Recipes", icon:BiPurchaseTag, address: `/user/dashboard/featured-recipes`},
    {label:"Order List", icon:CiBoxList, address: `/user/dashboard/orderlist`},
    {label:"My Blogs", icon:BiPurchaseTag, address: `/user/dashboard/my-blogs`},
    {label:"My Saved Blogs", icon:BiPurchaseTag, address: `/user/dashboard/saved-blogs`},
  ]

