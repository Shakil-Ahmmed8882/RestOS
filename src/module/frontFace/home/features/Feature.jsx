
import { useTheme } from "next-themes";
import "../styles/home.css";
import React from "react";

import  { DemoFoodCard } from "../components/DemoImage";
import { url2 } from "../../../dashboard/userDashboard/dashboard/components/charts/data";
import TitleAndDescription from "../components/TitleAndDescription";
import { CheckmarkIcon } from "react-hot-toast";

const Feature = () => {
  const { theme } = useTheme();

  return (
    <section className=" bg-[#fff] py-14">
      <div className="max-w-6xl  flex  px-3  flex-col lg:flex-row lg:items-center mx-auto  ">
        
        <div className="w-full  lg:w-[45%]">
          <DemoFood />

        </div>

        <div className="flex-1">
          <div
            className={` md:block ${
              theme == "dark" ? "bg-[#000000cb]" : " bg-[white]"
            }  w-full `}
          ></div>
          {/* <Curve></Curve> */}

          <div className="-z-30 text-right md:mr-8 sm:mt-11 flex-col-reverse lg:flex-row md:mt-20 gap-16  md:flex justify-center items-center">
            <div className="space-y-1 z-10 w-full">
              <TitleAndDescription />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;

{
  /* <p className={`${theme == "dark" ? "text-[#e3e3e3]" : ""} space-y-2`}>
            A trendy burger joint with a twist! Our mouthwatering burgers are made with locally sourced ingredients and served with a side of crispy, golden fries. From classic cheeseburgers to unique gourmet creations.
          </p> */
}

{
  /* <Slider></Slider> */
}

{
  /* <div>
              <h2
                className={`${
                  theme == "dark" ? "text-[#dadada]" : "text-[#828282]"
                } font-sans md:text-[17px]`}
              >
                Our Happy customers
              </h2>
              <div className="flex items-center gap-5">
                <div>
                  <GroupAvatar />
                </div>
                <p className="flex bg-[#FFF5E4] p-1 px-8">
                  <FaStar />{" "}
                </p>
              </div>
            </div> */
}

const DemoFood = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-y-4 lg:gap-x-4 items-start">
      <DemoFoodContent />
      <DemoFoodContent />
      <DemoFoodContent />
      <DemoFoodContent />
    </div>
  );
};

const DemoFoodContent = () => {
  return (
    <div className="bg-[white] justify-self-start w-full shadow-lg shadow-[#c1c1c13d] rounded-lg p-4 gap-4 relative">
      <DemoFoodCard url={url2} />
      <div className="absolute right-4 top-4">
      <CheckmarkIcon className="absolute"/>

      </div>
      <div className="flex-1 mt-2 flex  flex-col items-center">
        <h2 className="font-bold text-[17px] mt-3">Cherry Salad</h2>
        <strong className="text-md mt-2 text-primaryColor font-bold">
          $12.50
        </strong>
      </div>
    </div>
  );
};
