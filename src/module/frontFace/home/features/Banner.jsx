import { useTheme } from "next-themes";
import "../styles/home.css";
import React from "react";
import {Button} from "antd";
import chickenImage from "../../../../assets/img/home/chicken.png";
import discountImage from "../../../../assets/img/home/discount.png";
import Container from "../../../../shared/layouts/Container";
import PrimaryButton from "../../../../shared/ui/PrimaryButton";

const Banner = () => {
  const { theme } = useTheme();

  return (
    <Container>
      <div className=" min-h-[70vh] w-full flex justify-between items-center">
        <>
          <section className="w-full py-12 md:py-11 lg:py-16">
            <div className="lg:pt-0 flex flex-col-reverse lg:flex-row justify-center">
              <div className="flex flex-1 flex-col justify-center space-y-4">
                <div className="space-y-2 pt-8 lg:pt-0 md:w-[80%] lg:w-auto">
                  <h1
                    className=" 
                  font-bold  sm:text-4xl md:text-5xl lg:text-6xl"
                  >
                    Discover the our Flavors
                  </h1>
                  <p className="description py-2">
                    where we blend traditional recipes with innovative
                    techniques to create unforgettable dining experiences.
                  </p>
                  <article className=" space-y-4 sm:space-y-0 sm:flex gap-3 pt-5">
                    <PrimaryButton
                      handleClick={""}
                      className={" w-full shadow-md sm:!w-1/3 md:h-11  !bg-[#f7f7f7] !text-[black]"}
                      text={"Get it now "}
                    />
                    <PrimaryButton
                      handleClick={""}
                      className={" w-full  shadow-lg sm:!w-1/3 md:h-11"}
                      text={"Get it now"}
                    />
                     
                  </article>
                </div>
              </div>

              {/* ============= */}

              <div className="relative flex-1 ">
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
                  <h2 className="text-lg font-semibold text-red-500">
                    Discount
                  </h2>
                  <p className="text-sm text-gray-700">
                    Get this special offer!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      </div>
    </Container>
  );
};

export default Banner;
