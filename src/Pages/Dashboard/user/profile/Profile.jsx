import { useAuth } from "../../../../Utils/useAuthHelper";
import UserInfo from "./Avatar";

const MyProfile = () => {

    const { user } = useAuth()
    const userName = user?.displayName?.split(' ')[0]

    return (
        <div className="pt-4 bg-[white]">
            <div className=" mt-4 md:grid lg:grid md:grid-cols-2 lg:grid-cols-8 gap-3 w-full">
                {/* <h3 className="col-span-6 bg-[#ededed] h-screen"></h3>     */}
                <div className="col-span-8">
                <UserInfo/>
                </div>
            </div>
            

        </div>
    );
};
export default MyProfile
