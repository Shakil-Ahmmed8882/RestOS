import { AiOutlineDashboard } from "react-icons/ai";
import { BuildingIcon, PencilIcon, ScaleIcon, TagIcon } from "../assets/Icons";
import {
  foodManagementItems,
  recipeManagementItems,
  
} from "./dropdownContents";
import { List, NotebookTabs, User2Icon, Users } from "lucide-react";



export const adminSidebarDirectRoutes =[
  {label:"All Users", icon:Users, address: `/admin/dashboard/all-users`},
  {label:"All Orders", icon:List, address: `/admin/dashboard/all-orders`},
  {label:"All Blogs", icon:NotebookTabs, address: `/admin/dashboard/all-blog-posts`},
]




export const adminNestedRoutesArray = [
  
  {
    label: "Food Management",
    icon: BuildingIcon,
    items: foodManagementItems,
    key: "foods",
  },
  // {
  //   label: "Recipe Management",
  //   icon: PencilIcon,
  //   items: recipeManagementItems,
  //   key: "recipes",
  // },
 
];
