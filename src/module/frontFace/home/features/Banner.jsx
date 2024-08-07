
import { useTheme } from "next-themes";
import "../styles/home.css";
import React from "react";
import { Button } from "antd";
import DemoImage, { DemoFoodCard } from "../components/DemoImage";
import { url2 } from "../../../dashboard/userDashboard/dashboard/components/charts/data";
import TitleAndDescription from "../components/TitleAndDescription";


const Banner = () => {
  const { theme } = useTheme();

  return (
    <section className=" bg-[#f8f8f8] py-8 pt-16">
      <div className="max-w-6xl  flex  px-3  flex-col lg:flex-row lg:items-center mx-auto  ">
        <div className="flex-1">
          <div
            className={` md:block ${
              theme == "dark" ? "bg-[#000000cb]" : " bg-[white]"
            }  w-full `}
          ></div>
          {/* <Curve></Curve> */}

          <div className="-z-30 md:mr-8 sm:mt-11 flex-col-reverse lg:flex-row md:mt-20 gap-16  md:flex justify-center items-center">
            <div className="space-y-1 z-10 w-full">
              <TitleAndDescription />

              <div className="pb-32 w-full md:w-[80%] mx-auto pt-8">
                <DemoImage />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  lg:w-[45%]">
          <DemoFood />
          <div className="text-center mt-8">
            <Button className="p-5 text-primaryColor outline outline-[1px] outline-primaryColor px-11">
              Discover more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

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
    <div className="grid md:grid-cols-2 gap-8 lg:gap-y-24 lg:gap-x-4 items-start">
      <DemoFoodContent />
      <DemoFoodContent />
      <DemoFoodContent />
      <DemoFoodContent />
    </div>
  );
};

const DemoFoodContent = () => {
  return (
    <div className="bg-[white] rounded-md justify-self-start w-full shadow-lg shadow-[#6c6a6a22] rounded-lg lg:pt-14 lg:p-5  relative flex gap-8">
      <DemoFoodCard url={url2} />
      <div className="flex-1">
        <h2 className="font-bold text-[17px] mt-3">Cherry Salad</h2>
        <p className="text-sm py-2 text-[#5b5b5b]">
          Cucumber Organic and cherry
        </p>
        <strong className="text-sm font-bold">$12.50</strong>
      </div>
    </div>
  );
};
