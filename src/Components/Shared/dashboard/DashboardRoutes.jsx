import { CiHome } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { FaBorderNone } from "react-icons/fa6";
import { CiStickyNote } from "react-icons/ci";


export const DashboardRoutes = () => {
  return (
    <div className="">
        <ul className="px-3 h-screen overflow-auto space-y-1 text-[#999999]"> 
            <li className=" flex items-center gap-3 text-[#00D019] p-2 rounded-lg"><CiHome/>Dashboard</li>
            <li className=" p-2 rounded-lg flex items-center gap-3"><CiStickyNote/>Menu</li>
           <li className=" p-2 rounded-lg flex items-center gap-3"><CiBoxList/>Order list</li>
            <li className=" p-2 rounded-lg flex items-center gap-3"> <FaBorderNone/> Order details</li>
            <li className=" p-2 rounded-lg flex items-center gap-3"> <FaBorderNone/> Customer</li> 
            <li className=" p-2 rounded-lg flex items-center gap-3"> <FaBorderNone/> Analytics</li>
            <li className=" p-2 rounded-lg flex items-center gap-3"> <FaBorderNone/> Reviews</li>
          <li className=" p-2 rounded-lg flex items-center gap-3"> <FaBorderNone/> Foods</li>
            <li className=" p-2 rounded-lg flex items-center gap-3"> <FaBorderNone/> Food details</li>
            <li className=" p-2 rounded-lg flex items-center gap-3">Chat</li>
            <li className=" p-2 rounded-lg flex items-center gap-3">Setting</li>
        </ul>
    </div>
  );
};