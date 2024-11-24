
import React from "react";
import OrderLayout from "./components/OrderLayout";
import PurchaseOrderLayout from "./components/PurchaseOrderLayout";

const OrderAndPurchaseLayout = () => {

  return (
    <div>
        {/* <h2 className="font-bold text-light-gray italic text-3xl">Order List</h2> */}
        <OrderLayout/>
        <h2 className="font-bold text-light-gray italic">Purchase List</h2>
        <PurchaseOrderLayout/>
    </div>
  );
};

export default OrderAndPurchaseLayout;
