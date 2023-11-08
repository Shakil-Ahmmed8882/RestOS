import Spinner from "../../Components/Shared/Spinner/Spinner";
import UserTable from "../../Components/Shared/Table/Table";

import { BiSolidPencil } from "react-icons/bi";

import { columns } from "../../Components/Shared/Table/data";
import { useAxios } from "../../🔗Hook/useAxios";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/🛡️AuthProvider";

const Added_Food = () => {
  const { user, loading } = useContext(AuthContext);
  const xios = useAxios();
  const [data, setData] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    xios
      .get(`added-food?email=${user?.email}`)
      .then((res) => setData(res.data));
  }, [user?.email, xios]);

  if (loading) return <Spinner></Spinner>;

  //create an array of object using nextui table
  const users = [];

  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    users.push({
      id: data[i]?._id,
      name: data[i]?.name,
      "Added Time": data[i]?.orderedDate,
      status: "active",
      price: "$" + data[i]?.price,
      avatar: data[i]?.img,
      email: data[i]?.add_by,
      delete: (
        <Link
          to={`/food-update/${data[i]._id}`}
          className={` text-[rgb(5,19,20)] ${
            theme == "dark"
              ? "bg-[#ffffff13] btn border-none hover:bg-[#000000a0]"
              : "btn"
          }`}>
          <BiSolidPencil className="text-xl text-[#00e1ff]">
            Update
          </BiSolidPencil>
        </Link>
      ),
    });
  }

  return (
    <div className="relative">
      <div className="flex gap-3 flex-wrap justify-center">
        <UserTable columns={columns} users={users} />
      </div>
    </div>
  );
};

export default Added_Food;
