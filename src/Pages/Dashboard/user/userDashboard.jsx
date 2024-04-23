import PopularDishes from "./PopularDishes";
import Banner from "./banner/Banner";
import Pizza from "./Pizza";
import Categories from "./Categories/Categories";
import OrderChart from "./OrderChart";
import PurchaseChart from "./PurchaseChart";


const UserDashboard = () => {
  return (
    <div>
      {/* navbar */}

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
    </div>
  );
};

export default UserDashboard;