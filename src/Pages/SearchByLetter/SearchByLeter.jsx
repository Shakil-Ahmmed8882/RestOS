import axios from "axios";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useEffect } from "react";

const SearchByLeter = () => {
  const [data, setData] = useState();
  const { theme } = useTheme();
  useEffect(() => {
    axios
      .get(
        "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast"
      )
      .then((res) => setData(res.data));
  }, []);

  if (!data) return "loading";

  console.log(data.meals)

  return (
    <div>
      <h1
        className={`text-3xl ${
          theme == "dark" ? "text-[white] " : ""
        } md:text-5xl lg:text-5xl font-bold text-center py-11`}>
        Ingredients we use {data?.length}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      {
            data.meals?.slice(0,8).map((ing,idx) => <div key={idx} className=" card  bg-blend-multiply shadow-xl image-full">
            <figure><img src={ing.strMealThumb} alt="Shoes" /></figure>
            <div className="card-body flex items-center justify-center">
              <h2 className="text-[18px] text-center">{ing.strMeal
}</h2>
            </div>
          </div>)
      }

      </div>
    </div>
  );
};

export default SearchByLeter;
