import React from "react";
import PurchasedFoodsLayout from "../module/dashboard/userDashboard/purchases/PurchasedFoodsLayout";
import AddFood from "../module/dashboard/adminDashboard/foodManagement/addFood/AddFood";
import Allorders from "../module/dashboard/adminDashboard/foodManagement/allOrders/Allorders";

export const adminPaths = [
  {
    name: "Add Food",
    path: "add-food",
    element: <AddFood />,
  },
  {
    name: "All Orders",
    path: "all-orders",
    element: <Allorders></Allorders>,
  },
  {
    name: "All Orders",
    path: "all-purchased-list",
    element: <PurchasedFoodsLayout></PurchasedFoodsLayout>,
  },
];
