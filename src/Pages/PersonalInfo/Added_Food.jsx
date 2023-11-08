import Spinner from "../../Components/Shared/Spinner/Spinner";
import UserTable from "../../Components/Shared/Table/Table";
import { useAuth } from "../../Utils/useAuthHelper";
import { useGetData } from "../../🔗Hook/httpRequests";
import { columns} from "../../Components/Shared/Table/data";
import { useAxios } from "../../🔗Hook/useAxios";
import { useEffect, useState } from "react";

const Added_Food = () => {
  const { user,loading} = useAuth();
  const xios = useAxios()
  const [data,setData] = useState([])
//   const { data, isLoading } = useGetData({
//     endpoint: `added-food?email=${user?.email}`,
//     key: "added-food",
//   });



useEffect(()=> {
      xios.get(`added-food?email=${user?.email}`)
      .then(res => setData(res.data))   

},[user?.email,xios])

  if (loading) return <Spinner></Spinner>;



  // const users = [
  //       {
  //         id: 1,
  //         name: "Tony Reichert",
  //         role: "CEO",
  //         team: "Management",
  //         status: "active",
  //         age: "29",
  //         avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  //         email: "tony.reichert@example.com",
  //       },

  //     ];



  const users = [];


//   Food
// Added Time
// Age
// Avatar
// Email
// ACTIONS

  for (let i = 0; i < data.length; i++) {
      console.log(data[i])
    users.push({
      id: data[i]?._id,
      name: data[i]?.name,
      "Added Time": data[i]?.orderedDate,
      status: "active",
      age: "29",
      avatar: data[i]?.img,
      email: data[i]?.add_by
    });
  }



  return (
    <div className="relative">
      <h1 className="text-7xl font-bold">Added food</h1>
      <div className="flex gap-3 flex-wrap justify-center">
        <div>
          <h1>{data?.length == 0?'loading':data.length}</h1>
        </div>

        <UserTable columns={columns} users={users} />
      </div>
    </div>
  );
};

export default Added_Food;
