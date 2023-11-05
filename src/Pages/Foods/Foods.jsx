import { useTheme } from "next-themes";
import Card from "../../Components/Shared/Card/Card";
import Spinner from "../../Components/Shared/Spinner/Spinner";
import { useGetData } from "../../🔗Hook/httpRequests";
import reviews from "./FloatingContent";
import FooFloatingReview from "./FooFloatingReview";
import "./food.css";

const Foods = () => {
  const {theme} = useTheme()
  const themeColor = theme == 'dark'?'dark-bg':''
  const { data, isLoading } = useGetData({ endpoint: "foods", key: "foods" });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <div className={`pb-9 ${themeColor}`}>
      <div className={`h-[70vh] flex justify-center relative items-center  ${theme == 'dark'?"bg-dark-food":"bg-light-food"}`}>
        <input
          type="text"
          placeholder="Type here"
          className={`input w-full max-w-xs ${theme == 'dark'?'bg-[#2b2a2a8a] text-[white]':' bg-[#ffffffae] text-[black]'}`}
        />

        {reviews.map((review, idx) => (
          <div
            key={idx}
            className={`absolute ${
              idx === 0
                ? "top-11 opacity-50 hidden md:flex left-4"
                : idx === 1
                ? "top-11 right-4 hidden lg:flex"
                : idx === 2
                ? `bottom-11 left-4  hidden lg:flex `
                : "bottom-11 hidden md:flex right-4 opacity-70 "
            }`}>
            <FooFloatingReview key={idx} review={review} />
          </div>
        ))}
      </div>

      <div className={`text-center mb-5 py-9 ${theme == 'dark'? 'text-[white] ':''}`}>
        <p className="text-primaryColor font-normal italic">RestOS</p>
        <h2 className="text-4xl font-bold">MOST POPULAR ITEMS</h2>
      </div>
      <div className="responsive-grid max-w-6xl mx-auto">
        {data?.map((food) => (
          <Card key={food._id} food={food}></Card>
        ))}
      </div>
    </div>
  );
};

export default Foods;
