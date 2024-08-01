// @ts-nocheck
import { useGetData } from "../../../../🔗Hook/httpRequests";
import { HorizontalCard } from "./Card";
import "../../../../Pages/Foods/food.css";
import { useTheme } from "next-themes";
import chicken from "../../../../assets/img/chicken.png";
import knife from "../../../../assets/img/knife.gif";
import pizza from "../../../../assets/img/pizza.gif";
import duck from "../../../../assets/img/duck.gif";
import Loading from "../../../../Components/Shared/Loading";
import React from "react";
import { useGetAllFoodsQuery } from "../../../../redux/features/food/food.api";
import TopSellingFoodSkeleton from "../../../../Components/Shared/Spinner/TopSellingFoodSkeleton";

const TopSellingFood = () => {
  const { theme } = useTheme();
  const { data, isLoading } = useGetAllFoodsQuery([
    { name: "sort", value: "-orders" },
    { name: "limit", value: 6 },
  ]);

  if (isLoading) return <TopSellingFoodSkeleton/>

  return (
    <div
      className={`pb-20 pt-32 ${
        theme == "dark" ? "bg-[#111111]" : "bg-[#f6fffdde]"
      } w-full`}
    >
      <div className={`  max-w-6xl mx-auto md:flex  gap-3 mt-24 `}>
        <div className="flex-1 w-full md:w-0/3 md:ml-3">
          <div className="">
            {" "}
            <h1
              className={`text-3xl text-right md:text-4xl lg:text-4xl font-bold  ${
                theme == "dark" ? "text-[white] " : ""
              }`}
            >
              Top selling foods
            </h1>
            <p
              className={` ${
                theme == "dark" ? "text-[#cfcfcf]" : "text-[#605f5f]"
              } my-4 pb-9  md:text-right md:w-[55%] ml-auto `}
            >
              A diverse restaurant serving delicious cuisine from around the
              world, offering a variety of dishes to satisfy every palate.
              Whether youre a
            </p>
          </div>
          <div className="flex justify-center gap-3 items-center -mt-11">
            <div
              className={`p-3 rounded-full my-3 ${
                theme == "dark" ? "bg-[light-gray]" : "bg-[#dddada4a]"
              }`}
            >
              <img className="w-20" src={knife} alt="" />
            </div>
            <div
              className={`p-3 rounded-full my-8 ${
                theme == "dark" ? "bg-[light-gray]" : "bg-[#dddada4a]"
              }`}
            >
              <img className="w-20" src={pizza} alt="" />
            </div>
            <div
              className={`p-3 rounded-full my-8 ${
                theme == "dark" ? "bg-[light-gray]" : "bg-[#dddada4a]"
              }`}
            >
              <img className="w-20" src={duck} alt="" />
            </div>
          </div>

          <div className="text-center w-full  max-w-6xl mx-auto responsive-grid-top-selling-food gap-8 ">
            {/* ================= */}
            <div className="md:col-span-2 relative ">
              <img
                src={chicken}
                className="w-full h-full object-cover"
                alt=""
              />
              <div className="bg-[#2ca58d7e]  w-full h-20 absolute bottom-0">
                <div
                  className={`absolute rounded-lg bottom-3 left-3 bg-primaryColor px-11 py-3 text-[white]`}
                >
                  {" "}
                  20% Discount
                </div>
              </div>
            </div>
            {/* ================= */}
            {data?.data?.map((food, index) => (
              <HorizontalCard
                key={food._id}
                index={index}
                food={food}
              ></HorizontalCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSellingFood;
