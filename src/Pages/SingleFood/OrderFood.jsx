import { useParams } from "react-router-dom";
import { useGetData } from "../../🔗Hook/httpRequests";
import Spinner from "../../Components/Shared/Spinner/Spinner";
import { useState } from "react";
import getCurrentDate from "../../Utils/Date/currentDate";
import { useAxios } from "../../🔗Hook/useAxios";


const OrderFood = () => {
      const xios = useAxios()
      const { id } = useParams();
      //fetching data using hook
      const { data, isLoading } = useGetData({
        endpoint: `food/${id}`,
        key: "food",
      });


  const [totalOrders,setTotalOrders]  = useState(data?.orders)
  if (isLoading) return <Spinner></Spinner>;

  const {
    foodName,
    foodImage,
    foodCategory,
//     price,
//     orders,
//     quantity,
//     made_by,
//     food_origin,
//     description,
//     reviews,
  } = data;

  const {orderedData} = getCurrentDate(data)

const handleOrder = () => {
      setTotalOrders(totalOrders + 1)
      xios.patch(`orders-count`,{orders:totalOrders,id:id})
      .then(res => {
            if(res.data.modifiedCount > 0){
                  xios.post('')
            }
      })
  };


  return (
    <div>
      <h1 className="text-7xl font-bold">Order now</h1>
      <div>
        <img className="w-full h-[40vh]  object-cover" src={foodImage} alt="" />
        <p>{foodCategory}</p>
        <p>{foodName}</p>
        <button onClick={handleOrder} className="btn bg-primaryColor">Order now</button>
      </div>
    </div>
  );
};

export default OrderFood;
