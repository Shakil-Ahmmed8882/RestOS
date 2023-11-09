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
    <div className={` max-w-6xl mx-auto ${theme == 'dark'?'bg-[#1b1b1b]':'bg-[white]'} md:flex pt-8   gap-3 mt-24 text-center`}>
      <div className=" flex-1 w-[500px]">
        <img src="https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg" className="w-full flex-1 h-full object-cover" alt="" />
      </div>
      <div className="flex-1 w-full md:w-2/3">
        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold pb-1 text-center my-8`}>Top selling foods</h1>
        <p className="w-[60%] my-2 pb-8 mx-auto">A diverse restaurant serving delicious cuisine from around the world, offering a variety of dishes to satisfy every palate. Whether you're a fan of spicy Mexican, savory Italian, or exotic Asian  of global cuisine at its finest!" </p>
      <div className="text-center w-full  max-w-6xl mx-auto responsive-grid-top-selling-food gap-8 z-10">
      {data?.map((food) => (
        <HorizontalCard key={food._id} food={food}></HorizontalCard>
      ))}

      </div>

    </div>
    </div>
  );
};

export default TopSellingFood;
