import Spinner from "../../Components/Shared/Spinner/Spinner";
import UserTable from "../../Components/Shared/Table/Table";

import { BiSolidPencil } from "react-icons/bi";
import { BiSearchAlt } from "react-icons/bi";

import { columns } from "../../Components/Shared/Table/data";
import { useAxios } from "../../🔗Hook/useAxios";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/🛡️AuthProvider";
import AnimatedBlub from "../../Components/Shared/animatedBlub/AnimatedBlub";

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
    <div className={``}>
                  { data.length == 0 &&
      <div className={`${theme == 'dark'?'bg-[#0d0d0d] text-[#c6c6c6]':''} flex h-screen gap-3 justify-center items-center`}>

      <h1> <span className="text-5xl font-bold">No data found</span>
      </h1>
      <BiSearchAlt className="text-6xl text-primaryColor"></BiSearchAlt>
      <div className={`${theme == 'light'?'block':'hidden'}`}>
      <AnimatedBlub></AnimatedBlub>
      </div>
      </div>

      }
      <div className={` gap-3 ${theme == 'dark'?'text-[#c6c6c6]':''} flex-wrap justify-center`}>
        <UserTable columns={columns} users={users} />
      </div>
    </div>
  );
};

export default Added_Food;
