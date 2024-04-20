import Title from "../../../../Components/Shared/ui/Title";
import Dish from "../PopularDishes/Dish";

const Categories = () => {
    return (
        <>
            <Title title={'Categories'} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {[1, 2, 3, 4]?.map(dish => <Dish url={'https://banner2.cleanpng.com/20190508/kix/kisspng-cheeseburger-french-fries-vector-graphics-hamburge-5cd2e52ac7fd33.3097748715573250988192.jpg'}/>)}
            </div>

        </>
    );
};
export default Categories
