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
import Swal from "sweetalert2";
import { useState } from "react";
import getCurrentDate from "../../Utils/Date/currentDate";
import { useAuth } from "../../Utils/useAuthHelper";
import { useAxios } from "../../🔗Hook/useAxios";
import PurchasePage from "./PurchasePage";

const SingleFoodPage = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { user } = useAuth();
  const xios = useAxios();

  const { data, isLoading } = useGetData({
    endpoint: `food/${id}`,
    key: "food",
  });

  const goTo = useNavigate();
  const [totalOrders, setTotalOrders] = useState(0);
  // adding order date nad email to food data
  const orderedData = getCurrentDate(isLoading, data, user);

  if (isLoading) return <Spinner />;

  const {
    foodName,
    foodImage,
    foodCategory,
    price,
    food_origin,
    description,
    made_by,
    quantity,
    orders,
  } = data;

  // Drawer
  const handleOrderPurchase = async () => {
    if (isNaN(orders)) {
      return alert("orders is not a number");
    }
    // adding new order to existed one
    setTotalOrders(orders + 1);

    if (totalOrders > quantity) {
      return alert("This Product is not available");
    }

    if (totalOrders > quantity) {
      return alert("This Product is not available");
    }

    xios.post("add-ordered-food", orderedData).then((res) => {
      // checking is order being duplicated
      if (res.data.isExist) {
        Swal.fire({
          title: "This item already exists!",
          text: "Pleasy try another",
          icon: "error",
        });
        goTo("/food");
        return;
      }
      // update the order 
      if (res.data.insertedId) {
        xios
          .patch(`modify-orders`, { orders: orders + 1, id: id })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              return;
            }
          });
      // Letting the user know order been added 
        Swal.fire({
          title: "item has been added",
          text: "Have a delicious food",
          icon: "success",
        });
        goTo("/food");
      }
    });
  };

  return (
    <div className={`relative ${theme === "dark" && "bg-[#02080ad2] "}`}>
      <div className="w-full min-h-[80vh] relative overflow-x-hidden flex">
        <div className="absolute top-11 right-32">
          <AnimatedBlub></AnimatedBlub>
        </div>
        <div>
          <div className="flex min-h-[90vh] flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <BackgroundWithImage imageURL={foodImage}></BackgroundWithImage>
            </div>
            <div
              className={` space-y-2 flex flex-col justify-center flex-1 mb-5 py-9 ${
                theme == "dark"
                  ? " text-[#dcdcdccf]"
                  : "bg-[#ffffff2b] relative bg-blend-multiply"
              }`}>
              <h2
                className={`text-3xl md:text-5xl lg:text-7xl font-bold md:py-3 
              ${theme == "dark" ? "text-[white]" : "bg-[#ffffff2b]"}`}>
                {foodName}
              </h2>
              <p className=" font-normal ">category: {foodCategory}</p>
              <p className=" font-bold">price: ${price}</p>
              <p className=" font-normal ">Origin: {food_origin}</p>
              <p className=" font-normal ">Made by: {made_by} </p>
              <p className=" font-normal pb-5 w-2/3">{description}</p>

              {/* Drawer to purchase */}
              <div className="drawer drawer-end z-10">
                <input
                  id="my-drawer-4"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label
                    htmlFor="my-drawer-4"
                    className="drawer-button border-none outline-none flex bg-primaryColor w-[200px] text-[white] py-2 items-center gap-2 px-4 rounded  cursor-pointer btn-primary">
                    <img className="w-11" src={order_now} alt="" />
                    <button>Order</button>
                  </label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"></label>

                  <ul
                    className={`menu p-4 w-[90%]  md:w-[80%] ${
                      theme == "dark" ? "" : ""
                    }  text-base-content`}>
                    {/* Sidebar content here */}

                    <div className=" bg-[white] min-h-[150vh] md:min-h-screen pt-20 overflow-hidden justify-center items-center text-center w-full">
                      <PurchasePage
                        handleOrderPurchase={handleOrderPurchase}
                        data={data}></PurchasePage>
                    </div>
                  </ul>
                </div>
              </div>
              {/* ============ */}
            </div>
          </div>
          <img
            className="absolute top-80 md:top-32 md:-right-9 -right-20 rotate-6 w-96 -z-10 bg-blend-multiply"
            src={green_leaf}
            alt=""
          />
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
