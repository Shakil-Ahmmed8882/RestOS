// @ts-nocheck
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import { useTheme } from "next-themes";
import Loading from "../../../../shared/ui/loading/Loading";
import React from "react";
import "../../food/food.css"

const MealsCategory = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => setData(res.data));
    setLoading(false);
  }, []);

  if (loading) return <Loading></Loading>

  const mealData = data?.categories;

  return (
    <div
      className={` pb-16  text-center md:text-left ${
        theme == "dark" ? "bg-[#131313] text-[white]" : "bg-[#E6ECF6]"
      }`}>
      <div>
        <h1 className="text-4xl font-bold text-center pt-20 py-4">
          Our Meals Collection
        </h1>
        <p className="italic text-[#62e7ff] pb-9 text-center">RestOs</p>
      </div>
      <div className="px-3 md:px-0 grid grid-cols-1 gap-8 max-w-6xl md:grid-cols-2 lg:grid-cols-3 mx-auto ">
        {mealData?.slice(0, 12).map((meal, idx) => (
          <div
            key={idx}
            className={`pb-5 ${
              theme === "dark" 
                ? "text-primaryColor bg-[#26262663]  "
                : "bg-[#ffffffce]"
            } pl-1`}>
            <figure>
              <img
                className="mx-auto md:mx-0 md:ml-4 w-[200px] "
                src={meal.strCategoryThumb}
                alt="Shoes"
              />
            </figure>
            <div className="card-body -mt-3 ">
              <h2 className={` text-2xl font-bold ${theme == 'dark'?'text-[white]':"text-[black]"}`}>{meal?.strCategory}</h2>
              <p
                className={`${
                  theme == "dark" ? "text-[#bdbdbd]" : "text-[#505050]"
                }`}>
                {meal.strCategoryDescription.slice(0, 120)}
              </p>
            </div>
            <div className="rating pl-8 mb-3 -mt-3" >
              <input

                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-[#1f8d7d]"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-[#1f8d7d]"
                // checked
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-[#1f8d7d]"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-[#1f8d7d]"
              />
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-[#acacac]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealsCategory;
