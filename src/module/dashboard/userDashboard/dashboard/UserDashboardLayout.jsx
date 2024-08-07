

import Banner from "./components/Banner"; 
import React from "react";
import PopularDishes from "./features/PopularDishes";
import PurchaseChart from "./components/charts/PurchaseChart";
import OrderChart from "./components/charts/OrderChart";
import Categories from "./components/Categories";
import Pizza from "./components/Pizza";
import InitialAnimateContainer from "../../../../shared/animations/InitialAnimateContainer";


const UserDashboardLayout = () => {
  return (
    
    <InitialAnimateContainer>
      <div className="relative">
        <Banner />
        {/* chart view */}

        <div className=" mt-6 md:grid  md:grid-cols-2 lg:grid-cols-8 gap-3 w-full">
          <div className="col-span-6">
            <div className="grid lg:grid-cols-6 gap-3 ">
            <OrderChart />
            <PurchaseChart />
            </div>
            <Categories/>
            <Pizza />
          </div>
          <PopularDishes />
        </div>
      </div>
    </InitialAnimateContainer>
    
  );
};

export default UserDashboardLayout;