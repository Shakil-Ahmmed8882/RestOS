import Title from "../../../Components/Shared/ui/Title";
import Dish from "./PopularDishes/Dish";

const Pizza = () => {
    return (
        <div className="mt-8">
        
        <Title title={'Chose Pizza'}/>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {[1, 2, 3, 4, 5]?.map(dish => <Dish />)}
            </div>
        
         </div>
    );
};
export default Pizza
