import Title from "../../../../Components/Shared/ui/Title";
import Dish from "../PopularDishes/Dish";

const Categories = () => {
    return (
        <>
            <Title title={'Categories'} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {[1, 2, 3, 4]?.map(dish => <Dish />)}
            </div>

        </>
    );
};
export default Categories
