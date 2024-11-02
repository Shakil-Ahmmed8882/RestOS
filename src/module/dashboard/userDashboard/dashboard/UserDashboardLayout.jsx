import Banner from "./components/Banner";
import React from "react";
import PurchaseChart from "./components/charts/PurchaseChart";
import OrderChart from "./components/charts/OrderChart";
import { TrendingFoods } from "./components/Pizza";
import InitialAnimateContainer from "../../../../shared/animations/InitialAnimateContainer";
import { CategoryList } from "./components/categories/CategoryList";
import { categories, trendingFoods } from "../../../../demo-data/category";
import { useGetAllOrderSummaryQuery } from "../../../../redux/features/order/orderApi";
import RestaurantSidebar from "./features/RestaurantSidebar";

const UserDashboardLayout = () => {
  const { data, isLoading } = useGetAllOrderSummaryQuery(undefined);

  

  // Initialize the summary with default values
let orderSummary = {
  totalOrderCount: 0,
  totalOrderPrice: 0,
  totalPurchaseCount: 0,
  totalPurchasePrice: 0,
};

// Check if data is loaded and available
if (!isLoading && data) {
  orderSummary = data.data;
}

  return (
    <InitialAnimateContainer>
      <div className="relative">
        <Banner />
        {/* chart view */}
        
        <div className=" mt-6 md:grid  md:grid-cols-2 lg:grid-cols-12 gap-3 w-full">
          <div className="col-span-8 space-y-2">
            <div className="grid lg:grid-cols-6 gap-6 ">
            <OrderChart
                totalOrderPrice={orderSummary.totalOrderPrice} 
                totalOrderCount={orderSummary.totalOrderCount} 
              />
              <PurchaseChart
              totalPurchaseCount= {orderSummary?.totalPurchaseCount}
              totalPurchasePrice= {orderSummary?.totalPurchasePrice}
              />
            </div>
            <CategoryList
              categories={categories}
              title="Popular Categories"
              scrollSpeed={2}
            />
            ;
            <TrendingFoods
              categories={trendingFoods}
              title="Trending Foods"
              scrollSpeed={2}
            />
            ;
          </div>
          <div className="col-span-4 relative z-50 bg-[#fff] ">
          <RestaurantSidebar />
          </div>
        </div>
      </div>
    </InitialAnimateContainer>
  );
};

export default UserDashboardLayout;

