import PropTypes from "prop-types";

import details_icon from "../../../assets/img/details.gif";
import { useTheme } from "next-themes";
import darkDetail from "../../../assets/img/darkDetail.gif";
import { useNavigate } from "react-router-dom";

export default function Card({ food }) {
  const { theme } = useTheme();

  const goTo = useNavigate();
  const { foodName, foodImage, foodCategory, price, quantity, _id } = food;

  return (
    <div className={`overflow-hidden card-compact  ${theme == 'dark'?"bg-[#00000052]":"bg-[#fff] card"} rounded-lg items-start `}>
      <figure className="">
        <img
          src={foodImage}
          alt="Shoes"
          className={`mb-4   h-[100px]  object-cover ${
            theme === "dark" ? "w-[200%] ml-0 mt-0  " : "w-[100px] mt-4 bg-[white] ml-4"
          }`}
        />
      </figure>
      <div
        className={`w-full ${
          theme == "dark" ? "bg-[#262526aa]" : "bg-[white]"
        } card-body`}>
        <h2
          className={`font-semibold mb-1  text-[22px] ${
            theme == "dark" ? "text-[#4bd6fdc0]" : ""
          } pt-3`}>
          {foodName}
        </h2>
        <div
          className={` space-y-2  text-[16px]  items-center ${
            theme == "dark" ? "text-[#d7d6d6]" : "text-[#7a7979]"
          }`}>
          <div className="flex  gap-4">
            <div>
              <p>category: {foodCategory}</p>
              <p>Price: ${price}</p>
            </div>
            <div>
              <p>Quantity: {quantity}</p>
              <p>Orders: {food.orders}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center  mr-3 text-accent">
          {theme == "dark" ? (
            <img className="w-5" src={darkDetail} alt="" />
          ) : (
            <img className="w-5" src={details_icon} alt="" />
          )}
          <button
            className=" text-[17px] mt-1 py-2"
            onClick={() => goTo(`/food-details/${_id}`)}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  food: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    foodName: PropTypes.string.isRequired,
    foodImage: PropTypes.string.isRequired,
    foodCategory: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    orders: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    reviews: PropTypes.array.isRequired,
  }).isRequired,
};
