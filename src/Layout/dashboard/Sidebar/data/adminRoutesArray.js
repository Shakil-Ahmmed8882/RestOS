import { BuildingIcon, PencilIcon, ScaleIcon, TagIcon } from "../assets/Icons";
import {
  blogManagementItems,
  foodManagementItems,
  orderManagementItems,
  recipeManagementItems,
  userManagementItems,
} from "./dropdownContents";

export const adminRoutesArray = [
  {
    label: "User Management",
    icon: PencilIcon,
    items: userManagementItems,
    key: "users",
  },
  {
    label: "Food Management",
    icon: BuildingIcon,
    items: foodManagementItems,
    key: "foods",
  },
  {
    label: "Order Managemnt",
    icon: ScaleIcon,
    items: orderManagementItems,
    key: "orders",
  },
  {
    label: "Blog Management",
    icon: PencilIcon,
    items: blogManagementItems,
    key: "blogs",
  },
  {
    label: "Recipe Management",
    icon: PencilIcon,
    items: recipeManagementItems,
    key: "recipes",
  },
 
];
