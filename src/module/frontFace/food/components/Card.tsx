// @ts-nocheck
import PropTypes from "prop-types";
import details_icon from "../../../../assets/img/details.gif";
import { useTheme } from "next-themes";
import darkDetail from "../../../../assets/img/darkDetail.gif";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Card({ food }) {
  const { theme } = useTheme();

  const goTo = useNavigate();
  const { foodName, foodImage, foodCategory, price, quantity, _id } = food;

  return (
    <>
      <div className="grid gap-4 relative group ">
        
        <img
          src={foodImage}
          alt="Football"
          width={450}
          height={500}
          className={`rounded-lg object-top h-48 md:h-80 object-cover w-full aspect-[3/4] group-hover:opacity-80 transition-opacity`}
        />
        <div
          className={`grid gap-1 space-y-2  ${
            theme == "dark" ? "text-[white]" : ""
          }`}
        >
          <h3
            className={`font-semibold  ${
              theme == "dark" ? "text-[w" : ""
            } pt-3`}
          >
            {foodName}
          </h3>
          <div className={`flex justify-between pb-1 ${theme === "dark"? "text-[#eeeeee]":""}`}>
            <p className="text-sm leading-none ">{foodCategory}</p>
            <p className="text-sm leading-none ">$ {price}</p>
          </div>
        <div className="flex gap-2 items-center  mr-3 text-accent">
          
          <button
            className=" underline text-primaryColor underline-offset-4 "
            onClick={() => goTo(`/food-details/${_id}`)}
          >
            Shop
          </button>
        </div>
        </div>
      </div>
    </>
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
