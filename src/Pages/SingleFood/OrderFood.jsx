import { useParams } from "react-router-dom";
import { useGetData } from "../../🔗Hook/httpRequests";
import Spinner from "../../Components/Shared/Spinner/Spinner";
import { useState } from "react";
import getCurrentDate from "../../Utils/Date/currentDate";
import { useAxios } from "../../🔗Hook/useAxios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { useAuth } from "../../Utils/useAuthHelper";

const OrderFood = () => {
  
  const {user} = useAuth()

  const xios = useAxios();
  const { id } = useParams();
  //fetching data using hook
  const { data, isLoading } = useGetData({
    endpoint: `food/${id}`,
    key: "food",
  });

  const [totalOrders, setTotalOrders] = useState(data?.orders);
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

  const { orderedData } = getCurrentDate(data,user);

  const handleOrder = async() => {
    // Making a request to duplicate orders
    const res = await xios.get(`duplicate-order/${id}`) 
    if(res.data.matched){
      Swal.fire({
            title: "This item already exists!",
            text: "Pleasy try another",
            icon: "error"
          });
      return 
    }

    setTotalOrders(totalOrders + 1);
    xios.patch(`orders-count`, { orders: totalOrders, id: id }).then((res) => {
      if (res.data.modifiedCount > 0) {
        xios.post("add-ordered-food", orderedData).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
                  title: "item has been added",
                  text: "Have a delicious food",
                  icon: "success"
                });
          }
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-7xl font-bold">Order now</h1>
      <div>
        <img className="w-full h-[40vh]  object-cover" src={foodImage} alt="" />
        <p>{foodCategory}</p>
        <p>{foodName}</p>
        <button onClick={handleOrder} className="btn bg-primaryColor">
          Order now
        </button>
      </div>
    </div>
  );
};

export default OrderFood;
