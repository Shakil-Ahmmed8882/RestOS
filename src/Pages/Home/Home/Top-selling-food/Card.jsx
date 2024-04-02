import { BiSolidArrowToTop } from "react-icons/bi";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import chicken from "../../../../assets/img/chicken.png";

export function HorizontalCard({ food }) {
  const { theme } = useTheme();
  const {
    _id,
    foodName,
    foodImage,
    foodCategory,
    price,
    orders,
    quantity,
    made_by,
    food_origin,
    description,
    reviews,
    orderedDate,
    email,
  } = food;

  return (
    <div
      className={` p-3 rounded-lg space-y-3 text-left  shadow-lg  gap-5  relative items-center  ${
        theme == "dark" ? "bg-[#222222]  text-[white]" : "bg-[white]"
      }`}>
      <div className="">
        <img
          src={foodImage}
          alt="card-image "
          className="h-32 rounded-full border-2 border-[#747474] w-32 object-cover"
        />
      </div>
      <CardBody className="flex-1">
        <h1 className="font-bold mx-auto mb-2 text-[20px] ">
          {foodName ? foodName : "Beef"}
        </h1>
        <div className="sm:flex gap-3 text-[#727070]">
          <div>
            <p>available Orders: {orders}</p>
          </div>
          <div>
            <p> Category: {foodCategory}</p>
            <p> Price: ${price}</p>
          </div>
        </div>

        <Link to={`food-details/${_id}`} className="inline-block">
          <p className="flex text-primaryColor items-center gap-2">
            Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </p>
        </Link>
      </CardBody>
      <div
        className={`absolute bottom-6 rounded-full right-6 text-xl  bg-[#08A88A] p-1 text-[white] ${
          theme == "text-[black]" ? " text-primaryColor" : ""
        }`}>
        <BiSolidArrowToTop></BiSolidArrowToTop>
      </div>
    </div>
  );
}
