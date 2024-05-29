import { PopularDishesCard } from "../../../shared/charts/OrderedFoodCard";

const PopularDishes = () => {
    return (
        <>
        
      <div className="lg:flex col-span-2 h-screen mt-8 md:mt-0 sticky top-0  w-full gap-6">
        
        <div className="w-full  bg-[#ffffff] p-5 rounded-b-lg">
          {/* <Avatar /> */}
          <h1 className="text-[21px]">Most Popular 🍲🍲</h1>
          {
             [0,1,2,3]?.map(dish => <PopularDishesCard/>)
          }
        </div>
      </div>

        
        
         </>
    );
};
export default PopularDishes
