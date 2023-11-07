import Spinner from "../../../../Components/Shared/Spinner/Spinner";
import { useGetData } from "../../../../🔗Hook/httpRequests";
import { HorizontalCard } from "./Card";
import '../../../../Pages/Foods/food.css'
import { Link } from "react-router-dom";

const TopSellingFood = () => {
  const { data, isLoading } = useGetData({
    endpoint: "top-selling-food",
    key: "top-selling-food",
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <div className="bg-[white] pt-8 text-center">
        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold pb-1 text-center`}>Top selling foods</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptatibus saepe modi vel, ex laboriosam soluta voluptate<br></br> tempora? In vitae possimus quidem at blanditiis nesciunt rem? Veniam necessitatibus est error.</p>
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
