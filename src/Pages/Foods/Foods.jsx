
import { useTheme } from "next-themes";
import { useGetData } from "../../🔗Hook/httpRequests";
import Card from "../../Components/Shared/Card/Card";
import Spinner from "../../Components/Shared/Spinner/Spinner";
import reviews from "./FloatingContent";
import FooFloatingReview from "./FooFloatingReview";
import "./food.css";
import { useEffect, useState } from "react";

const Foods = () => {
  const { data: count, isLoading: isCountLoading } = useGetData({
    endpoint: "total-food-count",
    key: "items-count",
  });

  const { theme } = useTheme();
  const themeColor = theme === "dark" ? "dark-bg" : "";

  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [activePage, setActivePage] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const [searchResult, setSearchResult] = useState([]);
  const [isFiledEmpty,setIsFieldEmpty] = useState(true)
  // pagination
  const numberOfPages = Math.ceil(count?.count / itemsPerPage)
  
  const pages = [0,1]
  for(let i = 0; i < numberOfPages.length;i++){
    pages.push(i)
  }
  console.log(numberOfPages)



  useEffect(() => {
    fetch(`https://rest-os-server.vercel.app/foods?page=${activePage}&size=${itemsPerPage}`,{credentials:'include'})
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [activePage, itemsPerPage]);

  if (isLoading && isCountLoading) return <Spinner />;

  const handleItemPerPage = (e) => {
    setItemsPerPage(e.target.value);
    setActivePage(0);
  };

  const handleSearchFood = (e) => {
    setIsFieldEmpty(e.target.value === ''?true:false)
    
    const searchTerm = e.target.value.toLowerCase();
    const foundFoods = data.filter((food) =>
      food.foodName.toLowerCase().includes(searchTerm)
    );
    setSearchResult(foundFoods);
  };


  return (
    <div className={`pb-9 ${themeColor}`}>
      <div className={`h-[70vh] flex justify-center relative items-center ${theme === "dark" ? "bg-dark-food" : "bg-light-food"}`}>
        <div className="relative md:w-[300px]">
        <input
          onChange={handleSearchFood}
          type="text"
          // ref={inputRef}
          placeholder="Search by food name"
          className={`input w-full focus-within:outline-none max-w-xs ${theme === "dark" ? "bg-[#20acd377] text-[white]" : "bg-[#ffffffae] text-[black]"}`}
        />
      <div className={`badge outline-none border-none absolute -right-1 -top-2 ${isFiledEmpty ? '' : ' text-[white] bg-primaryColor'}`}>
  {searchResult.length > 0 && isFiledEmpty ? '0': searchResult.length}
  {
    !isFiledEmpty &&
    <div className="w-2 h-[52px] relative top-28  right-28 bg-[#119bea58]">
  <div className="absolute w-2 h-6 top-7  -right-2 rotate-45 bg-[#119eea5d]"></div>
    <div className="absolute w-2 h-6 top-7  -left-2 -rotate-45 bg-[#11a5ea5a]"></div>
  {/* <div className="bg-[#00d7fd50] w-4 h-4 rounded-full absolute -bottom-1 -right-1"></div> */}
  <div className="bg-[#fd008f50] w-4 h-4 rounded-full absolute -bottom-8 -right-1"></div>
  <div></div>

  </div>
  }
</div>


        </div>
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
            }`}
          >
            <FooFloatingReview key={idx} review={review} />
          </div>
        ))}
      </div>
      <div className={`text-center mb-5 py-9 ${theme === "dark" ? "text-[white] " : ""}`}>
        <p className="text-primaryColor font-normal italic">RestOS</p>
        <h2 className="text-4xl font-bold">MOST POPULAR ITEMS</h2>
      </div>
      <div className={`${isFiledEmpty?'responsive-grid':'responsive-grid-search'} max-w-6xl mx-auto`}>
        {searchResult.length ? searchResult.map((food) => <Card key={food._id} food={food} />) : data.map((food) => <Card key={food._id} food={food} />)}
      </div>
      {
        pages.length && isFiledEmpty &&
      <div className="flex flex-wrap justify-center pt-9 gap-3 items-center">
        {
          pages.map((page) => (
            <button key={page} className={`btn ${activePage === page ? "bg-primaryColor focus-within:outline-none border-none text-[white]" : ""}`} onClick={() => setActivePage(page)}>
              {page}
            </button>
          ))}
        <select value={itemsPerPage} onChange={(e) => handleItemPerPage(e)} className="px-3">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="19">all</option>
        </select>
      </div>

      }
    </div>
  );
};

export default Foods;
