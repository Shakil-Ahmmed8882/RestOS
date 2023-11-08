import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import InfiniteSpinner from "../../Components/Shared/Spinner/InfiniteSpinner";


const MealsCategory = () => {
      const [data,setData] = useState()
      const[loading,setLoading] =  useState(true)

      useEffect(()=>{
            axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(res => setData(res.data))
            setLoading(false)
      },[])


      if(loading) return <InfiniteSpinner></InfiniteSpinner>
            
      const mealData = data?.categories
      

 
      return (
            <div className="md:px-32 text-center">
                  <h1 className="text-5xl font-bold py-11">Our Meals Collection</h1>
                  <div className="responsive-grid ">
                        {
                              mealData?.map(meal => <div key={meal.id} className="  shadow-xl ">
                              <figure><img src={meal.strCategoryThumb} alt="Shoes" /></figure>
                              <div className="card-body">
                                <h2 className="text-center text-2xl font-bold">{meal?.strCategory}</h2>
                                <p>{meal.strCategoryDescription.slice(0,120)}</p>
                              </div>
                            </div>)
                        }
                  </div>
            </div>
      );
};

export default MealsCategory;