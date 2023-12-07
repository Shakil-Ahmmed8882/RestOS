import { useGetData } from "../../../../🔗Hook/httpRequests";
import { HorizontalCard } from "./Card";
import "../../../../Pages/Foods/food.css";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import chicken from "../../../../assets/img/chicken.png";
import knife from "../../../../assets/img/knife.gif";
import pizza from "../../../../assets/img/pizza.gif";
import duck from "../../../../assets/img/duck.gif";
import Loading from "../../../../Components/Shared/Loading";

const TopSellingFood = () => {
  const { theme } = useTheme();
  const { data, isLoading } = useGetData({
    endpoint: "top-selling-food",
    key: "top-selling-food",
  });

  if (isLoading) return <Loading></Loading>

  return (
    <div
      className={`pb-20 ${
        theme == "dark" ? "bg-[#111111]" : "bg-[#FAFAFB]"
      } w-full`}>
      <div className={`  max-w-6xl mx-auto md:flex pt-8   gap-3 mt-24 `}>
        <div className="flex-1 w-full md:w-0/3 md:ml-3">
        <div className="">
              {" "}
              <h1
                className={`text-3xl text-center md:text-4xl lg:text-4xl font-bold  ${
                  theme == "dark"
                    ? "text-[white] w-[70%] ml-[15%]"
                    : ""
                }`}>
                Top selling foods
              </h1>
              <p
                className={` ${
                  theme == "dark"
                    ? "text-[#cfcfcf]"
                    : "text-[#605f5f]"
                } my-4 pb-9 text-center w-[70%] ml-[15%] `}>
                A diverse restaurant serving delicious cuisine from around the
                world, offering a variety of dishes to satisfy every palate.
                Whether you're a fan of spicy Mexican, savory Italian, or exotic
                Asian of global cuisine at its finest!"{" "}
              </p>
            </div>
          <div className="flex justify-center gap-3 items-center -mt-11">
            <div className={`p-3 rounded-full my-3 ${theme == 'dark'?"bg-[light-gray]":"bg-[#dddada4a]"}`}>
              <img className="w-20" src={knife} alt="" />
            </div>
            <div className={`p-3 rounded-full my-8 ${theme == 'dark'?"bg-[light-gray]":"bg-[#dddada4a]"}`}>
              <img className="w-20" src={pizza} alt="" />
            </div>
            <div className={`p-3 rounded-full my-8 ${theme == 'dark'?"bg-[light-gray]":"bg-[#dddada4a]"}`}>
              <img className="w-20" src={duck} alt="" />
            </div>
          </div>

          <div className="text-center w-full  max-w-6xl mx-auto responsive-grid-top-selling-food gap-8 z-10">
            {/* ================= */}
            <div className="md:col-span-2 relative ">
              <img
                src={chicken}
                className="w-full h-full object-cover"
                alt=""
              />
              <div className="bg-[#2ca58d7e]  w-full h-20 absolute bottom-0">
              <div
                className={`absolute rounded-lg bottom-3 left-3 bg-primaryColor px-11 py-3 text-[white]`}>
                {" "}
                20% Discount
              </div>

              </div>
            </div>
            {/* ================= */}
            {data?.map((food, index) => (
              <HorizontalCard
                key={food._id}
                index={index}
                food={food}></HorizontalCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSellingFood;
