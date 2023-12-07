import axios from "axios";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useEffect } from "react";
import { getFutureDate } from "../../Utils/getFutureDate";
// icons
// import { BiFoodTag } from "react-icons/bi";
import { BiFork } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { BiGift } from "react-icons/bi";
import Loading from "../../Components/Shared/Loading";
const icons = [<BiFork/>,<BiGift/>,<BiGift/>,<BiFork/>]


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

  if (!data) return <Loading></Loading>


  return (
    <div className={`${theme == "dark" ? "bg-[#08a88b45] " : "bg-[#f0ecec96]"}`}>

      <div className="flex flex-col-reverse md:flex-row max-w-6xl py-11 mx-auto">
      <div className="grid grid-cols-1  sm:grid-cols-1 w-full px-2 md:grid-cols-2 gap-4">
        {data.meals?.slice(0, 4).map((ing, idx) => (
          <div key={idx} className={`rounded-lg relative pt-7 ${theme == 'dark'?"bg-[#221B1F] text-[white]":'bg-[white]'}`}>
            <figure className={`text-4xl  absolute ${theme === 'dark'?"bg-[#c8c7c71a]":"bg-[#dfdada8c]"} p-1 rounded-lg top-2 left-4 md:left-8 ${idx == 0 || idx == 3?'text-[#ff0090]':'text-accent'}`}>
              {icons[idx]}
            </figure>
              <BsBookmark className="absolute text-[18px] right-5 top-4"></BsBookmark>
            <div className="card-body -ml-4 md:-ml-0 flex ">
              <h2 className="text-[17px] ">{ing.strMeal}</h2>
              <p className="absolute bottom-1 text-[gray] ">{getFutureDate(idx+1,(4 +idx),(13 +idx +1))}</p>
            </div>
          </div>
        ))}
      </div>
        <div className="mb-8 md:mb-0">
        <h1
        className={`text-3xl md:text-right ${
          theme == "dark" ? "text-[white] " : ""
        } md:text-5xl lg:text-4xl font-bold  pt-11`}>
        Ingredients we use {data?.length}
      </h1>
      
      <p
        className={`md:text-right  ${
          theme == "dark" ? "text-[#cfcfcf]" : "text-[gray]"
        } pb-8 md:w-[80%] ml-auto mt-2`}>
        In crafting a delightful dessert, the combination of carefully selected
        ingredients forms the essence of a sweet indulgence. The foundation of
        the treat lies in the crushed Digestive{" "}
      </p>
      <div className="flex md:justify-end -mt-2">
        <button className="btn btn-accent text-[white]">Learn more</button>

      </div>
        </div>
      </div>
    </div>
  );
};

export default SearchByLeter;
