import { AiOutlineDelete, AiTwotoneDelete } from "react-icons/ai";
import { useGetData } from "../../../../🔗Hook/httpRequests";
import { useAuth } from "../../../../Utils/useAuthHelper";
import Loading from "../../../../Components/Shared/Loading";

const Users = () => {
  const { user } = useAuth();

  const { data, isLoading, refetch } = useGetData({
    endpoint: `ordered-list?email=${user?.email}&status=pending`,
    key: ["orderlist"],
  });

  if (isLoading) return <Loading></Loading>;
  if (!data) return <Loading></Loading>;

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

  return { users,refetch };
};

export default Users;
