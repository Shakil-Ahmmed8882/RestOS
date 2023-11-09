import { AiOutlineDelete } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import Spinner from "../../Components/Shared/Spinner/Spinner";
import UserTable from "../../Components/Shared/Table/Table";

import { useAuth } from "../../Utils/useAuthHelper";
import { useAxios } from "../../🔗Hook/useAxios";
import { useTheme } from "next-themes";
import { columns } from "./TableHeading";

import { useGetData } from "../../🔗Hook/httpRequests";
import AnimatedBlub from "../../Components/Shared/animatedBlub/AnimatedBlub";

const OrderList = () => {
  const { theme } = useTheme();
  const xios = useAxios();
  const { user } = useAuth();

const {data,isLoading,refetch} = useGetData({endpoint:`ordered-list?email=${user?.email}`,key:'orderlist'})

  if (isLoading) return <Spinner></Spinner>;

  //create an array of object using nextui table

  // delete the ordered food
  const handleOrderedFood = async (_id) => {
    const res = await xios.delete(`cancel-ordered-food/${_id}`);
    if (res.data.deletedCount > 0) {
      console.log("deleted");
      refetch()
    }
  };

  const users = [];

  for (let i = 0; i < data.length; i++) {
    users.push({
      id: data[i]?._id,
      name: data[i]?.foodName,
      "Added Time": data[i]?.orderedDate.split(",").slice(0, data.length - 2),
      status: "active",
      price: "$" + data[i]?.price,
      avatar: data[i]?.foodImage,
      made_by: data[i]?.made_by,
      delete: (
        <button
          onClick={() => handleOrderedFood(data[i]._id)}
          className={` text-[rgb(5,19,20)] ${
            theme == "dark"
              ? "bg-[#ffffff13] btn border-none hover:bg-[#000000a0]"
              : "btn"
          }`}>
          {theme == "light" ? (
            <AiTwotoneDelete className="text-xl text-primaryColor" />
          ) : (
            <AiOutlineDelete className="text-xl text-primaryColor"></AiOutlineDelete>
          )}
        </button>
      ),
    });
  }

  console.log(data.length);
  return (
    <div>
            { data.length == 0 &&
      <div className="flex h-screen gap-3 justify-center items-center">

      <h1> <span className="text-5xl font-bold">No data found</span>
      </h1>
      <BiSearchAlt className="text-6xl text-primaryColor"></BiSearchAlt>
      <div>
      <AnimatedBlub></AnimatedBlub>
      </div>
      </div>

      }
      {/* <button onClick={()=>handleOrderedFood()} className="btn bg-primaryColor">Delete</button> */}

      <UserTable columns={columns} users={users}></UserTable>
    </div>
  );
};

export default OrderList;
