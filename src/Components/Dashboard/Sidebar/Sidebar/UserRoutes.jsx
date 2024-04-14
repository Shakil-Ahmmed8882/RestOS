import { CgProfile } from "react-icons/cg";
import { BiPurchaseTag } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import MenuItem from "../MenuItem";



export const UserRoutes = () => {
    return (
        <>

            {/* User routes  */}
            <MenuItem label={'Profile'} icon={CgProfile} address={'/dashboard/profile'} />
            <MenuItem label={'Order List'} icon={CiBoxList} address={'/dashboard/orderlist'} />
            <MenuItem label={'Purchased List'} icon={BiPurchaseTag} address={'/dashboard/purchasedList'} />
            {/* <MenuItem address={"/"} icon={BriefcaseIcon} label={"Design Team"} />
            <MenuItem address={"/marketing-design"} icon={MegaphoneIcon} label={"Marketing Design"} />
            <MenuItem address={"/development-team"} icon={CogIcon} label={"Development Team"} />
            <MenuItem address={"/create-team"} icon={PlusIcon} label={"Create A Team"} /> */}
        </>
    );
};

