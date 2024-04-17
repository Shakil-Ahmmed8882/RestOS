import { OrderedFoodCard } from "./OrderedFoodCard";

const SidebarOrderlist = () => {
    return (
        <>
        
      <div className="lg:flex lg:col-span-2 w-full gap-6">
        
        <div className="w-full text-center bg-[#ffffff] p-4 rounded-lg">
          {/* <Avatar /> */}
          <h1 className="text-2xl">My Order 🍲🍲</h1>
          {
             [0,1]?.map(orderedFood => <OrderedFoodCard/>)
          }
        </div>
      </div>

        
        
         </>
    );
};
export default SidebarOrderlist
