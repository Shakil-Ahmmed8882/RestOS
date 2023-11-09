
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
      className={` p-3 space-y-3 text-left  gap-5  relative items-center  ${
        theme == "dark" ? "bg-[#222222] card-dark-hover text-[white]" : "card-hover"
      }`}>
      <div className="flex gap-3 pt-2">
        <img 
          src={foodImage}
          alt="card-image "
          className="h-11 rounded-full border-2 border-[#747474] w-11 object-cover"
        />
        <img 
          src={foodImage}
          alt="card-image "
          className="h-11 rounded-full border-2 border-[#747474] w-11 object-cover"
        />
        <img 
          src={foodImage}
          alt="card-image "
          className="h-11 rounded-full border-2 border-[#747474] w-11 object-cover"
        />
      </div>
      <CardBody className="flex-1">
          <div className="sm:flex gap-3 py-3">
            <div>
          <h1 className="font-bold">{foodName}</h1>
          <p>available Orders: {orders}</p>

            </div>
            <div>

          <p> Category: {foodCategory}</p>
          <p> Price: ${price}</p>
            </div>
        </div>

        <Link to={`food-details/${_id}`} className="inline-block">
          <Button variant="text" className="flex items-center gap-2">
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
          </Button>
        </Link>
      </CardBody>
      <div className={`absolute top-2 rounded-full right-2 text-2xl  bg-[#60e7e3] p-1 text-[white] ${theme == 'dark'?' text-primaryColor':''}`}>
        <BiSolidArrowToTop></BiSolidArrowToTop>
      </div>
    </div>
  );
}
