import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { BsCone } from "react-icons/bs";
import { useTheme } from "next-themes";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { BsCursorFill } from "react-icons/bs";
import { BsCupStraw } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

import "./food.css";

import React from "react";
// @ts-ignore
import green_leaf from "../../../assets/img/greenloaf.png";
import Swal from "sweetalert2";
import { useState } from "react";
import { BsFillGeoAltFill } from "react-icons/bs";

import Loading from "../../../shared/ui/loading/Loading";
import { useAuth } from "../../../Utils/useAuthHelper";
import { useGetSinglefoodQuery } from "../../../redux/features/food/food.api";
import { useCreateOrderMutation } from "../../../redux/features/order/orderApi";

const FoodDetails = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { user } = useAuth();

  const { data, isLoading } = useGetSinglefoodQuery(id);
  // @ts-ignore
  const [createOrder, { data: OData, isLoading: OIsloading }] =
    useCreateOrderMutation();

  const goTo = useNavigate();
  const [totalOrders, setTotalOrders] = useState(0);
  // adding order date nad email to food data
  if (!user) {
    return "/sign-in";
  }

  if (isLoading) return <Loading></Loading>;

  // const orderedData = getCurrentDate(isLoading, data?.data, user);

  const {
    _id,
    foodName,
    foodImage,
    foodCategory,
    price,
    food_origin,
    description,
    made_by,
    quantity,
    orders,
  } = data?.data || {};

  // Drawer
  const handleOrderPurchase = async () => {
    if (isNaN(orders)) {
      return alert("orders is not a number");
    }
    // adding new order to existed one
    // setTotalOrders(orders + 1);

    if (totalOrders > quantity) {
      return alert("This Product is not available");
    }

    if (totalOrders > quantity) {
      return alert("This Product is not available");
    }

    const orderData = {
      foodId: _id,
      foodName,
      foodImage,
      price,
      made_by,
      email: user?.email,
    };

    createOrder(orderData);
    console.log(orderData);
    console.log(OData);

    if (OData?.success) {
      Swal.fire({
        title: "Ordered.",
        text: "Enjoy more...",
        icon: "success",
      });
      goTo("/food");
    } else {
      Swal.fire({
        title: "Already added!",
        icon: "error",
      });
    }

    //   // if (res.data.insertedId) {
    //   //   xios
    //   //     .patch(`modify-orders`, { orders: orders + 1, id: id })
    //   //     .then((res) => {
    //   //       if (res.data.modifiedCount > 0) {
    //   //         return;
    //   //       }
    //   //     });
    //   //   // Letting the user know order been added ..
    //   //   Swal.fire({
    //   //     title: "item has been ordered",
    //   //     text: "Have a delicious food",
    //   //     icon: "success",
    //   //   });
    //   //   goTo("/food");
    //   // }
    // });
  };

  return (
    <div
      className={`relative  mt-8 overflow-x-hidden ${
        theme === "light" && "bg-[#f7f6f6]"
      }  ${theme === "dark" && "bg-[#02080ad2] "}`}
    >
      <div className="max-w-6xl  mx-auto">
        <div className="absolute  top-11 right-32"></div>
        <div className="">
          <div className=" md:flex md:flex-row-reverse gap-3">
            <div className="flex-1 grid  md:h-[80vh] md:w-1/2 relative -top-0  bg-[#d8d6d64b] items-center">
              <img
                src={foodImage}
                className=" object-cover w-full h-[200px] overflow-hidden md:h-full  rounded-xl"
                alt=""
              />
              <div
                className={`p-3 absolute  w-full  rounded-lg left-0 px-11 py-11 bottom-0 text-[white] ${
                  theme == "dark" ? "bg-[light-gray]" : "bg-[#04110f8d]"
                }`}
              >
                <BsCupStraw className="w-[100px] rotate-12 h-[100px] bg-[#ffffffcb] text-[black] rounded-full p-3 absolute -top-11 left-[40%] " />
              </div>
            </div>
            <div className="relative flex-1">
              <BsBookmarkCheckFill className="absolute right-6 top-6 text-2xl" />

              <div
                className={` space-y-2 pl-3 flex flex-col   flex-1 mb-5 py-9 ${
                  theme == "dark"
                    ? " text-[#dcdcdccf]"
                    : "bg-[#fff]  relative bg-blend-multiply w-full"
                }`}
              >
                <h2
                  className={`text-6xl  md:text-5xl lg:text-5xl font-bold md:py-3 
              ${theme == "dark" ? "text-[white]" : "bg-[#ffffff2b]"}`}
                >
                  {foodName}
                </h2>
                <div
                  className={`${
                    theme === "dark" ? "bg-[#2a2a2a]" : "bg-[white]"
                  } shadow-lg w-2/3 p-3 rounded relative`}
                >
                  <div className="text-2xl flex gap-1 items-center">
                    <BiSolidBadgeCheck className="text-[#39e739]" />
                    Get 20% discount
                  </div>
                  <BsCursorFill className="absolute text-5xl text-[#EA1179]  -top-5 rotate-12 right-1"></BsCursorFill>
                </div>
                <div
                  className={`${
                    theme === "dark" ? "text-[#a19e9e]" : "text-[gray] "
                  }`}
                >
                  <div className="space-y-1 mt-3  flex-1 text-[18px]">
                    <p className=" font-normal ">category: {foodCategory}</p>
                    <div className="flex items-centerr gap-1">
                      <BsCartCheckFill className="text-[#FEBB38]" />
                      <p className="">Delivery: ${price}</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="  rounded-lg flex items-center gap-2">
                        <BsFillGeoAltFill className="text-deepPink" />
                        <p className=" font-normal ">Origin: {food_origin}</p>
                      </div>

                      <div className=" rounded-lg flex items-center gap-2">
                        <BsCone className="text-[#7afb7a] text-[22px]" />
                        <p className=" font-normal ">Made by: {made_by} </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`space-y-1 ${
                      theme == "dark"
                        ? "bg-[#37373786] text-white"
                        : "bg-[#f5daa435]"
                    } mt-4 p-3 rounded-lg flex-1 text-[20px]`}
                  >
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={foodImage}
                        className="w-[70px] h-[70px]  rounded-full"
                        alt=""
                      />
                      <p className={` font-normal pb-5 w-full  text-[17px]`}>
                        {description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Drawer to purchase */}
                <div className="drawer drawer-end z-10">
                  <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content flex md:justify-end">
                    {/* Page content here */}
                    <label
                      htmlFor="my-drawer-4"
                      className="drawer-button hover:bg-transparent border-none outline-none flex bg-transparent w-[200px] text-[white] rounded-full items-center gap-2   cursor-pointer btn-primary"
                    >
                      {/* <img className="w-11" src={order_now} alt="" /> */}
                      <button
                        onClick={handleOrderPurchase}
                        className="bg-primaryColor ml-auto mr-5 mt-6 p-5 flex gap-3 rounded-lg items-center text-[21px]"
                      >
                        Order
                        <BsFillArrowRightCircleFill className="text-3xl" />
                      </button>
                    </label>
                  </div>
                </div>
                {/* ============ */}
              </div>
            </div>
          </div>
          <img
            className="absolute top-96 md:top-32 md:-right-9 -right-20 rotate-6 w-96  -z-20 filter blur-3xl bg-blend-multiply"
            src={green_leaf}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

FoodDetails.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default FoodDetails;
