import { useTheme } from "next-themes";
import Card from "../../Components/Shared/Card/Card";
import Spinner from "../../Components/Shared/Spinner/Spinner";
import { useGetData } from "../../🔗Hook/httpRequests";
import reviews from "./FloatingContent";
import FooFloatingReview from "./FooFloatingReview";
import "./food.css";
import { PagesCount } from "../../Utils/Pagination/Pagination";
import { useEffect, useState } from "react";


const Foods = () => {
  const {theme} = useTheme()
  const themeColor = theme == 'dark'?'dark-bg':''
  // Pagination part
  const [itemsPerPage,setItemsPerPage] = useState(9)
  const [activePage,setActivePage] = useState(2)
  const [isLoading,setIsLoading] = useState(true)
  const [data,setData] = useState([])
  console.log(activePage,itemsPerPage)

  useEffect(()=>{
    fetch(`http://localhost:5000/foods?page=${activePage}&size=${itemsPerPage}`)
    .then(res => res.json())
    .then(data =>{
       setData(data)
       setIsLoading(false)
      })
    .catch(err => console.log(err))
  },[activePage,itemsPerPage])

  // const { data, isLoading } = useGetData({ endpoint: `foods?page=${activePage}&size=${itemsPerPage}`, key: "foods" });
  //====> pagingation page active and product perpage
  const { data:count,isLoading:isCountLoading} = useGetData({ endpoint: "total-food-count", key: "items-count" });
  const pages = PagesCount(count?.count,isCountLoading,activePage,itemsPerPage)
  

  if (isLoading && isCountLoading) return <Spinner></Spinner>;


  const handleItemPerPage = e => {
    setItemsPerPage(e.target.value)
    setActivePage(0)
  }




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

        <div className="flex flex-wrap justify-center pt-9 gap-3 items-center">
        { pages.length &&
          pages?.map(page => <button key={page} className={`btn  ${activePage == page?'bg-primaryColor focus-within:outline-none border-none text-[white]':''}`} onClick={()=> setActivePage(page)}>{page}</button>)
        } 
        <select value={itemsPerPage} onChange={(e)=>handleItemPerPage(e)} className="px-3">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Foods;
