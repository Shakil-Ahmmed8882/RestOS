import PopularDishes from "./PopularDishes";
import Banner from "./Banner";
import Pizza from "./Pizza";
import Categories from "./Categories/Categories";


const UserDashboard = () => {

  return (
    <div>
      {/* navbar */}

      <div className="relative">
        <Banner />
        {/* chart view */}

        <div className=" mt-6 md:grid lg:grid md:grid-cols-2 lg:grid-cols-8 gap-3 w-full">
          <div className="col-span-6">
            <Categories />
            <Pizza />
          </div>
          <PopularDishes />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;