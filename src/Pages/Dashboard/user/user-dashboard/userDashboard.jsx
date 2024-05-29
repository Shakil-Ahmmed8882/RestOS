
import Pizza from "./pizza/Pizza";
import Categories from "./Categories/Categories";
import OrderChart from "../../shared/charts/OrderChart"; 
import PurchaseChart from "../../shared/charts/PurchaseChart";
import InitialAnimateContainer from "../../../../Components/Shared/animation/InitialAnimateContainer";
import Banner from "./banner/Banner";
import PopularDishes from "./PopularDishes/PopularDishes";


const UserDashboard = () => {
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

export default UserDashboard;