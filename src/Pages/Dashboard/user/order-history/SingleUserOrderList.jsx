import { AiOutlineDelete } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";

import { useAuth } from "../../../../Utils/useAuthHelper";
import { useAxios } from "../../../../🔗Hook/useAxios";
import { useTheme } from "next-themes";
import { columns } from "./TableHeading";
import { Helmet } from "react-helmet";

import Loading from "../../../../Components/Shared/Loading";
import NoDataFound from "../../../../Components/Shared/NoDataFound";
import InitialAnimateContainer from "../../../../Components/Shared/animation/InitialAnimateContainer";
import UserTable from "../../../../Components/Shared/Table/Table";
import React from "react";
import { useGetAllOrdersQuery } from "../../../../redux/features/order/orderApi";

const SingleUserOrderList = () => {
  const { theme } = useTheme();
  const xios = useAxios();
  // @ts-ignore
  const { user } = useAuth();

  const { data, isLoading, refetch } = useGetAllOrdersQuery([
    { name: "email", value: user?.email },
  ]);

  if (isLoading) return <Loading></Loading>;
  const orderData = data?.data;
  if (!orderData) return <Loading></Loading>;

  //create an array of object using nextui table

  // delete the ordered food
  const handleDeleteOrderedFood = async (_id) => {
    const res = await xios.delete(`cancel-ordered-food/${_id}`);
    if (res.data.deletedCount > 0) {
      console.log("deleted");
      refetch();
    } else {
      <Loading></Loading>;
    }
  };

  const users = [];
  for (let i = 0; i < orderData.length; i++) {
    users.push({
      id: orderData[i]?._id,
      name: orderData[i]?.foodName,
      "Added Time": orderData[i]?.createdAt,
      status: "pending",
      price: "$" + orderData[i]?.price,
      avatar: orderData[i]?.foodImage,
      made_by: orderData[i]?.made_by,
      active: orderData[i]?.made_by,
      delete: (
        <button
          onClick={() => handleDeleteOrderedFood(data[i]._id)}
          className={` text-[rgb(5,19,20)] ${
            theme == "dark"
              ? "bg-[#ffffff13] btn border-none hover:bg-[#000000a0]"
              : "btn"
          }`}
        >
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
        {orderData ? (
          <UserTable columns={columns} users={users}></UserTable>
        ) : (
          <NoDataFound></NoDataFound>
        )}
      </div>
    </InitialAnimateContainer>
  );
};

export default SingleUserOrderList;
