import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useGetData } from "../../🔗Hook/httpRequests";
import Spinner from "../../Components/Shared/Spinner/Spinner";

import "./food.css";
import AnimatedBlub from "../../Components/Shared/animatedBlub/AnimatedBlub";
import { useTheme } from "next-themes";

import order_now from "../../assets/img/ordernfow.gif";
import green_leaf from "../../assets/img/greenloaf.png";
import BackgroundWithImage from "../../Utils/dynamic-style/BackgroundImage";

const SingleFoodPage = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { data, isLoading } = useGetData({
    endpoint: `food/${id}`,
    key: "food",
  });
  const goTo = useNavigate();

  if (isLoading) return <Spinner />;

  const {
    _id,
    foodName,
    foodImage,
    foodCategory,
    price,
    food_origin,
    description,
    made_by
  } = data;

  return (
    <div className={`relative ${theme === 'dark' && 'bg-[#02080ad2] '}`}>
      <div className="w-full h-screen relative overflow-x-hidden flex ">
        <div className="absolute top-11 right-32">
          <AnimatedBlub></AnimatedBlub>
        </div>
        <div>
          <div className="flex h-[85vh] gap-8">
            <div className="flex-1 ">
            <BackgroundWithImage imageURL={foodImage} ></BackgroundWithImage>
            </div>
            <div
              className={` space-y-2 flex flex-col justify-center flex-1 mb-5 py-9 ${
                theme == "dark"
                  ? " text-[#dcdcdccf]"
                  : "bg-[#ffffff2b] relative bg-blend-multiply"
              }`}>
              <h2 className={`text-3xl md:text-5xl lg:text-7xl font-bold py-3 
              ${theme == "dark"? "text-[white]": 'bg-[#ffffff2b]'  }`}>
                {foodName}
              </h2>
              <p className=" font-normal ">category: {foodCategory}</p>
              <p className=" font-bold">price: ${price}</p>
              <p className=" font-normal ">Origin: {food_origin}</p>
              <p className=" font-normal ">Made by: {made_by} </p>
              <p className=" font-normal pb-5 w-2/3">{description}</p>
              <button
                onClick={() => goTo(`/order-food/${_id}`)}
                className="flex bg-primaryColor w-[200px] text-[white] py-2 items-center px-4 rounded ">
                <img className="w-11" src={order_now} alt="" />
                Order Now
              </button>
            </div>
          </div>
          <img className="absolute top-32 -right-9 rotate-6 w-96 -z-10 bg-blend-multiply" src={green_leaf} alt="" />
        </div>
      </div>
    </div>
  );
};

SingleFoodPage.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SingleFoodPage;
