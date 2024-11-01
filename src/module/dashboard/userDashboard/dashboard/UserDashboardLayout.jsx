import Banner from "./components/Banner";
import React from "react";
import PopularDishes from "./features/PopularDishes";
import PurchaseChart from "./components/charts/PurchaseChart";
import OrderChart from "./components/charts/OrderChart";
import { TrendingFoods } from "./components/Pizza";
import InitialAnimateContainer from "../../../../shared/animations/InitialAnimateContainer";
import { CategoryList } from "./components/categories/CategoryList";
import { categories, trendingFoods } from "../../../../demo-data/category";

const UserDashboardLayout = () => {
  return (
    <InitialAnimateContainer>
      <div className="relative">
        <Banner />
        {/* chart view */}

        <div className=" mt-6 md:grid  md:grid-cols-2 lg:grid-cols-8 gap-3 w-full">
          <div className="col-span-6 space-y-2">
            <div className="grid lg:grid-cols-6 gap-6 ">
              <OrderChart />
              <PurchaseChart />
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
          <PopularDishes />
        </div>
      </div>
    </InitialAnimateContainer>
  );
};

export default UserDashboardLayout;
