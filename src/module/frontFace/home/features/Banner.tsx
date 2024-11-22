import React from "react";
import chickenImage from "../../../../assets/img/home/chicken.png";
import discountImage from "../../../../assets/img/home/discount.png";

import { motion } from "framer-motion";
import FoodSlide from "../components/banner/components/FoodSlide";
import { Link} from "react-router-dom";

export default function Banner() {
  return (
    <div className="bg-white px-4 md:px-0 !py-11">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-between flex-col-reverse lg:flex-row ">
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Discover the our Flavors
            </h1>
            <p className="text-gray-600 mb-6">
              Piada Italian Street Food is a fast casual Italian cuisine
              restaurant chain with 41 locations in seven states.
            </p>
            <div className="flex items-center text-gray-500 mb-8">
              <span className="mr-2">🕒</span>
              Need to time arrive in your place - 1.30 hours
            </div>
            <Link
              to={"/menu"}
              className="bg-primaryColor text-[white] px-8 py-2 rounded"
            >
              Get our menu
            </Link>
          </div>

          <div className="relative flex-1 pb-10 lg:pb-0">
            <div className="">
              <img
                className=" w-full sm:w-[70%] md:w-[60%] lg:w-auto mx-auto "
                src={chickenImage}
                alt="Chicken Dish"
              />
              <div className="absolute bg-[#ffffff8c]  left-6 md:left-36 lg:left-4 top-8 z-10 md:z-40  shadow-lg rounded-md p-4 hidden sm:block w-[200px]">
                <img
                  className="absolute  w-16 h-16 right-[-2rem] top-0"
                  src={discountImage}
                  alt="Discount Badge"
                />
                <h2 className="text-lg font-semibold text-red-500">Discount</h2>
                <p className="text-sm text-gray-700">Get this special offer!</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="mx-auto hidden md:block">
      <FoodSlide />

      </div>
    </div>
  );
}
