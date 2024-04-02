import { AiOutlineDelete } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import UserTable from "../../Components/Shared/Table/Table";

import { useAxios } from "../../🔗Hook/useAxios";
import { useTheme } from "next-themes";
import { columns } from "../Order-list/TableHeading";
import { Helmet } from "react-helmet";

import { useGetData } from "../../🔗Hook/httpRequests";
import AnimatedBlub from "../../Components/Shared/animatedBlub/AnimatedBlub";
import Loading from "../../Components/Shared/Loading";
import toast from "react-hot-toast";


const AllOrders = () => {
  const { theme } = useTheme();
  const xios = useAxios();

  const { data, isLoading, refetch } = useGetData({
    endpoint: `All-orders`,
    key: ["orderlist"],
  });

  if (isLoading) return <Loading></Loading>;


  //create an array of object using nextui table

  // delete the ordered food
  const handleOrderedFood = async (_id) => {
    const res = await xios.delete(`cancel-ordered-food/${_id}`);
    if (res.data.deletedCount > 0) {
      console.log("deleted");
      refetch();
    } else {
      <Loading></Loading>;
    }
  };

  const handleConfirm = async(_id) => {
    const res = await xios.patch(`confirm-order?id=${_id}`)
    if(res.data.modifiedCount > 0) {
          refetch();
          toast.success("Confirmed")
    }

  };

  const users = [];

  for (let i = 0; i < data.length; i++) {
    users.push({
      id: data[i]?._id,
      name: data[i]?.foodName,
      "Added Time": data[i]?.orderedDate.split(",").slice(0, data.length - 2),
      status: "pending",
      price: "$" + data[i]?.price,
      avatar: data[i]?.foodImage,
      made_by: data[i]?.made_by,
      active: data[i]?.made_by,
      delete: (
        <div className="flex items-center gap-3">
          <button onClick={()=>handleConfirm(data[i]._id)}>Confirm</button>
          <button
            onClick={() => handleOrderedFood(data[i]._id)}
            className={` text-[rgb(5,19,20)] ${
              theme == "dark"
                ? "bg-[#ffffff13] btn border-none hover:bg-[#000000a0]"
                : "btn"
            }`}>
            {theme == "light" ? (
              <>
                <AiTwotoneDelete className="text-xl text-primaryColor" />
              </>
            ) : (
              <AiOutlineDelete className="text-xl text-primaryColor"></AiOutlineDelete>
            )}
          </button>
        </div>
      ),
    });
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Helmet>
        <title>RestOs || Order-list</title>
      </Helmet>
      ;
      {data.length == 0 && (
        <div className="flex h-screen gap-3 justify-center items-center">
          <h1>
            {" "}
            <span
              className={`text-5xl font-bold ${
                theme == "dark" ? "text-[white]" : ""
              }`}>
              No data found
            </span>
          </h1>
          <BiSearchAlt className="text-6xl text-primaryColor"></BiSearchAlt>
          <div>
            <AnimatedBlub></AnimatedBlub>
          </div>
        </div>
      )}
      {/* <button onClick={()=>handleOrderedFood()} className="btn bg-primaryColor">Delete</button> */}
      {data.length !== 0 && (
        <UserTable columns={columns} users={users}></UserTable>
      )}
    </div>
  );
};

export default AllOrders;
