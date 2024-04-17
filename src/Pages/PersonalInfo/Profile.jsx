import {Profile} from "../../Components/Shared/Profile/Profile";
import OrderChart from "../Dashboard/user/OrderChart";
import PurchaseChart from "../Dashboard/user/PurchaseChart";


const MyProfile = () => {
    return (
        <div className=" mt-4 md:grid lg:grid md:grid-cols-2 lg:grid-cols-8 gap-3 w-full">

            <OrderChart />
            <PurchaseChart />
            
        </div>
    );
};
export default MyProfile
