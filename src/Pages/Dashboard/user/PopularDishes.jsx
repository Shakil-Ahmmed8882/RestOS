import { PopularDishesCard } from "./OrderedFoodCard";

const PopularDishes = () => {
    return (
        <>
        
      <div className="lg:flex lg:col-span-2 w-full gap-6">
        
        <div className="w-full text-center bg-[#ffffff] p-4 rounded-b-lg">
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
