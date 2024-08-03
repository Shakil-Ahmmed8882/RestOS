import { CgProfile } from "react-icons/cg";
import { BiPurchaseTag } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import MenuItem from "../MenuItem";
import { AiOutlineDashboard } from "react-icons/ai";
import React from "react";



const userRoutesArray = [
    {label:"Dashboard", icon:AiOutlineDashboard, address: `/dashboard`},
    {label:"Profile", icon:CgProfile, address: `/dashboard/user/profile`},
    {label:"Featured Recipes", icon:BiPurchaseTag, address: `/dashboard/user/featured-recipes`},
    {label:"Order List", icon:CiBoxList, address: `/dashboard/user/orderlist`},
    {label:"Purchased List", icon:BiPurchaseTag, address: `/dashboard/user/purchasedList`},
  ]





export const UserRoutes = () => {
    return (
        <>
            {/* User routes  */}
            {userRoutesArray?.map(route => (
            <MenuItem label={route.label} icon={route.icon} address={route.address} />
            ))}
            
            
        </>
    );
};

