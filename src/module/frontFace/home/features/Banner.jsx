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

// import { useTheme } from "next-themes";
// import "../styles/home.css";
// import React from "react";

// import  { DemoFoodCard } from "../components/DemoImage";
// import { url2 } from "../../../dashboard/userDashboard/dashboard/components/charts/data";
// import TitleAndDescription from "../components/TitleAndDescription";
// import { CheckmarkIcon } from "react-hot-toast";

// const Banner = () => {
//   const { theme } = useTheme();

//   return (
//     <section className=" bg-[#fff] py-14">
//       <div className="max-w-6xl  flex  px-3  flex-col lg:flex-row lg:items-center mx-auto  ">
//         <div className="flex-1">
//           <div
//             className={` md:block ${
//               theme == "dark" ? "bg-[#000000cb]" : " bg-[white]"
//             }  w-full `}
//           ></div>
//           {/* <Curve></Curve> */}

//           <div className="-z-30 md:mr-8 sm:mt-11 flex-col-reverse lg:flex-row md:mt-20 gap-16  md:flex justify-center items-center">
//             <div className="space-y-1 z-10 w-full">
//               <TitleAndDescription />

//             </div>
//           </div>
//         </div>
//         <div className="w-full  lg:w-[45%]">
//           <DemoFood />

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Banner;

// {
//   /* <p className={`${theme == "dark" ? "text-[#e3e3e3]" : ""} space-y-2`}>
//             A trendy burger joint with a twist! Our mouthwatering burgers are made with locally sourced ingredients and served with a side of crispy, golden fries. From classic cheeseburgers to unique gourmet creations.
//           </p> */
// }

// {
//   /* <Slider></Slider> */
// }

// {
//   /* <div>
//               <h2
//                 className={`${
//                   theme == "dark" ? "text-[#dadada]" : "text-[#828282]"
//                 } font-sans md:text-[17px]`}
//               >
//                 Our Happy customers
//               </h2>
//               <div className="flex items-center gap-5">
//                 <div>
//                   <GroupAvatar />
//                 </div>
//                 <p className="flex bg-[#FFF5E4] p-1 px-8">
//                   <FaStar />{" "}
//                 </p>
//               </div>
//             </div> */
// }

// const DemoFood = () => {
//   return (
//     <div className="grid md:grid-cols-2 gap-8 lg:gap-y-4 lg:gap-x-4 items-start">
//       <DemoFoodContent />
//       <DemoFoodContent />
//       <DemoFoodContent />
//       <DemoFoodContent />
//     </div>
//   );
// };

// const DemoFoodContent = () => {
//   return (
//     <div className="bg-[white] justify-self-start w-full shadow-lg shadow-[#c1c1c13d] rounded-lg p-4 gap-4 relative">
//       <DemoFoodCard url={url2} />
//       <div className="absolute right-4 top-4">
//       <CheckmarkIcon className="absolute"/>

//       </div>
//       <div className="flex-1 mt-2 flex  flex-col items-center">
//         <h2 className="font-bold text-[17px] mt-3">Cherry Salad</h2>
//         <strong className="text-md mt-2 text-primaryColor font-bold">
//           $12.50
//         </strong>
//       </div>
//     </div>
//   );
// };
