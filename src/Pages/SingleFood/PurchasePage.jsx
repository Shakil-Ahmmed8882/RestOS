import { useTheme } from "next-themes";
import PropTypes from "prop-types";
import './food.css'
import AnimatedBlub from "../../Components/Shared/animatedBlub/AnimatedBlub";
import { useAuth } from "../../Utils/useAuthHelper";

const PurchasePage = ({ handleOrderPurchase, data }) => {
      const {user} = useAuth()
      const {theme} = useTheme()

      // console.log(Object.keys(data).join(','))
      // const {_id,foodName,foodImage,foodCategory,price,orders,quantity,made_by,food_origin,description,reviews,orderedDate,email} = data
      const {foodName,foodImage,price} = data


  return (
    <div className={`md:flex gap-8 items-center ${theme == 'dark'?'bg-[#000000e9]':'bg-[white]'} absolute top-0 right-0 bottom-0 p-8 min-h-screen pt-11 md:pt-0`}>
      <div className=" justify-center bg-transparent">
        <div className="shadow-lg p-3">
          <img
            className="w-full h-full"
            src={foodImage}
            alt=""
          />
        </div>
        <div className="flex gap-3">
          <div className="shadow-lg p-3  flex-1">
            <img
              className="w-full h-full"
              src="https://th.bing.com/th/id/OIP.OM_YQDFEEZ6NPj0XapYwFgHaEo?pid=ImgDet&rs=1"
              alt=""
            />
          </div>
          <div className="shadow-lg flex-1 p-3">
            <img
              className="w-full h-full"
              src="https://www.karenberrios.com/wp-content/uploads/2021/03/10-Foods-To-Feed-Your-Gut-Microbiome-768x512.jpg"
              alt=""
            />
          </div>
          <div className="shadow-lg p-3 flex-1 ">
            <img
              className="w-full h-full"
              src="https://th.bing.com/th/id/OIP.OM_YQDFEEZ6NPj0XapYwFgHaEo?pid=ImgDet&rs=1"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={`${theme == 'dark'?'text-gradient ':''} space-y-3 text-left`}>
            <div className="absolute -top-40 right-32">
            {
                  theme == 'light'&&
            <AnimatedBlub></AnimatedBlub>
            }

            </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold pb-1">{foodName}</h1>
        <p className={`${theme == 'dark'?'text-[#e3e3e3]':''} space-y-2`} >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt
          quibusdam ipsa, sapiente facere pariatur excepturi mollitia aliquid
          laboriosam illum rerum voluptas molestias quae enim esse voluptatibus
          maxime ab commodi labore!
   
        <p>Buyer Name: {user?.displayName}</p>
            <p>Buyer Email: {user?.email}</p>
            <p>buying date</p>
            <p>{foodName}</p>
           <p>price:${price}</p>
           </p>
        <button
        
          className="h-11 text-center   font-bold  drawer-button order-none outline-none flex bg-primaryColor w-[200px] text-[white] py-2 items-center gap-2 px-4 rounded  cursor-pointer "
          onClick={handleOrderPurchase}>
          Purchase
        </button>
      </div>
    </div>
  );
};

// Define the PropTypes for handleOrderPurchase
PurchasePage.propTypes = {
  handleOrderPurchase: PropTypes.func.isRequired,
};

export default PurchasePage;
