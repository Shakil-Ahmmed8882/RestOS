import { useNavigate, useParams } from "react-router-dom";
import { useGetData } from "../../🔗Hook/httpRequests";
import Spinner from "../../Components/Shared/Spinner/Spinner";
import { useState } from "react";
import getCurrentDate from "../../Utils/Date/currentDate";
import { useAxios } from "../../🔗Hook/useAxios";
import Swal from "sweetalert2";
import { useAuth } from "../../Utils/useAuthHelper";
import { useTheme } from "next-themes";

const OrderFood = () => {
  const {theme} = useTheme()
  const { user } = useAuth();
  const xios = useAxios();
  const { id } = useParams();
  const goTo = useNavigate()

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

  // adding order date nad email to food data
  const { orderedData } = getCurrentDate(data, user);

  const handleOrderPurchase = async () => {


    setTotalOrders(totalOrders + 1);
    xios.patch(`modify-orders`, { orders: totalOrders, id: id }).then((res) => {
      if (res.data.modifiedCount > 0) {

        xios.post("add-ordered-food", orderedData).then((res) => {

          if (res.data.insertedId) {
            Swal.fire({
                  title: "Item has been ordered",
                  text: "Have a delicious food",
                  icon: "success"
                });
                goTo('/food')
          }

          if(res.data.isExist){
                 Swal.fire({
                  title: "Already exists!",
                  text: "Pleasy try another",
                  icon: "error"
          });
            goTo('/food')
          }
        });
      }
    });

  };

  return (
    <div>
      <div>
        <h1 className="text-7xl font-bold">Order now</h1>
        <img className="w-full h-[40vh]  object-cover" src={foodImage} alt="" />
        <p>{foodCategory}</p>
        <p>{foodName}</p>
      </div>

      <div className="drawer drawer-end z-10">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-primary">
              <button>Puchase</button>
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"></label>
          <ul className={`menu p-4 w-[80%] ${theme == 'dark'?'bg-dark-food':'bg-light-food'} min-h-full text-base-content`}>
            {/* Sidebar content here */}
            
            
            <div className=" bg-[white] h-[300px] text-center w-full mt-32">
            
                <button className="btn btn-primary mt-28 font-bold " onClick={handleOrderPurchase}>Purchase</button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderFood;
