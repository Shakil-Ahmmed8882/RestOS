import { CgProfile } from "react-icons/cg";
import { BiPurchaseTag } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import MenuItem from "../MenuItem";
import { AiOutlineDashboard } from "react-icons/ai";



export const UserRoutes = () => {
    return (
        <>

            {/* User routes  */}
            <MenuItem label={"Dashboard"}  icon={AiOutlineDashboard} address={"/dashboard"} />
            <MenuItem label={'Profile'} icon={CgProfile} address={'/dashboard/profile'} />
            <MenuItem label={'Order List'} icon={CiBoxList} address={'/dashboard/orderlist'} />
            <MenuItem label={'Purchased List'} icon={BiPurchaseTag} address={'/dashboard/purchasedList'} />
            
        </>
    );
};

