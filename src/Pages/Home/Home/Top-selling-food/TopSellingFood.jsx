import Spinner from "../../../../Components/Shared/Spinner/Spinner";
import { useGetData } from "../../../../🔗Hook/httpRequests";
import { HorizontalCard } from "./Card";
import '../../../../Pages/Foods/food.css'
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";

const TopSellingFood = () => {
  const {theme} = useTheme()
  const { data, isLoading } = useGetData({
    endpoint: "top-selling-food",
    key: "top-selling-food",
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <div className={`${theme == 'dark'?'bg-[#4C4C4C]':'bg-[white]'} pt-8  mt-24 text-center`}>
        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold pb-1 text-center`}>Top selling foods</h1>
        <p className="w-[60%] my-2 pb-8 mx-auto">A diverse restaurant serving delicious cuisine from around the world, offering a variety of dishes to satisfy every palate. Whether you're a fan of spicy Mexican, savory Italian, or exotic Asian  of global cuisine at its finest!" </p>
      <div className="text-center min-h-screen  max-w-6xl mx-auto responsive-grid-top-selling-food gap-8 z-10">
      {data?.map((food) => (
        <HorizontalCard key={food._id} food={food}></HorizontalCard>
      ))}
    </div>
    <div className="py-11">
    <Link to='/food'>
    <button className="btn mt-5 outline-none border-none bg-primaryColor cursor-pointer text-[white] btn-primary">All menues</button>         
    </Link>
    </div>
    </div>
  );
};

export default TopSellingFood;
