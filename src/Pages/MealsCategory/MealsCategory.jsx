import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import InfiniteSpinner from "../../Components/Shared/Spinner/InfiniteSpinner";
import { useTheme } from "next-themes";



const MealsCategory = () => {
      const [data,setData] = useState()
      const[loading,setLoading] =  useState(true)
      const {theme} = useTheme()

      useEffect(()=>{
            axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(res => setData(res.data))
            setLoading(false)
      },[])


      if(loading) return <InfiniteSpinner></InfiniteSpinner>
            
      const mealData = data?.categories
      

 
      return (
            <div className={`md:px-32  text-center md:text-left ${theme == 'dark'?'bg-[#131313] text-[white]':'bg-[white]'}`}>
                  <div>
                  <h1 className="text-4xl font-bold text-center pt-20 py-11">Our Meals Collection</h1>
                  <p className="italic text-[#62e7ff] pb-9 text-center">RestOs</p>
                  </div>
                  <div className="responsive-grid  max-w-6xl mx-auto">
                        {
                                    mealData?.slice(0,12).map(meal => <div key={meal.id} className={`${theme === 'dark'?"text-primaryColor bg-[#26262663]  ":'bg-[#e4e4e456]'} p-3`}>
                              <figure><img className="mx-auto md:mx-0 w-[200px] " src={meal.strCategoryThumb} alt="Shoes" /></figure>
                              <div className="card-body -mt-3">
                                <h2 className=" text-2xl font-bold">{meal?.strCategory}</h2>
                                <p className={`${theme == 'dark'?'text-[#bdbdbd]':'text-[#505050]'}`}>{meal.strCategoryDescription.slice(0,120)}</p>
                              </div>
                            </div>)
                        }
                  </div>
            </div>
      );
};

export default MealsCategory;