import { AiOutlineDelete } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";

import { useAuth } from "../../../../Utils/useAuthHelper"; 
import { useAxios } from "../../../../🔗Hook/useAxios";
import { useTheme } from "next-themes";
import { columns } from "./TableHeading";
import { Helmet } from "react-helmet";

import { useGetData } from "../../../../🔗Hook/httpRequests"; 
import Loading from "../../../../Components/Shared/Loading";
import NoDataFound from "../../../../Components/Shared/NoDataFound"; 
import InitialAnimateContainer from "../../../../Components/Shared/animation/InitialAnimateContainer";
import UserTable from "../../../../Components/Shared/Table/Table";

const SingleUserOrderList = () => {
  const { theme } = useTheme();
  const xios = useAxios();
  const { user } = useAuth();

  const { data, isLoading, refetch } = useGetData({
    endpoint: `ordered-list?email=${user?.email}&status=pending`,
    key: ["orderlist"],
  });

  if (isLoading) return <Loading></Loading>;
  if (!data) return <Loading></Loading>;

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
  refetch()
  console.log(data)

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

  return (
    <InitialAnimateContainer>
    <div className="max-w-6xl mx-auto">
      <Helmet>
        <title>RestOs || Order-list</title>
      </Helmet>
      {
        data? 
        <UserTable columns={columns} users={users}></UserTable>:
        <NoDataFound></NoDataFound>
      }
    </div>
    </InitialAnimateContainer>
  );
};

export default SingleUserOrderList;
