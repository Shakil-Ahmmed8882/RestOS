import { Profile } from "../../../Components/Shared/Profile/Profile";
import { useAuth } from "../../../Utils/useAuthHelper";
import Avatar from "./Avatar";
import ProfileForm from "./ProfileForm";

const MyProfile = () => {

    const { user } = useAuth()
    const userName = user?.displayName?.split(' ')[0]

    return (
        <div className="pt-4 bg-[white]">
            <h2 className="text-[28px]">{userName}&apos;s Profile</h2>
            <p className="text-[19px] text-[gray]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni aliquam.</p>
            <div className=" mt-4 md:grid lg:grid md:grid-cols-2 lg:grid-cols-8 gap-3 w-full">
                {/* <h3 className="col-span-6 bg-[#ededed] h-screen"></h3>     */}
                <div className="col-span-6">
                <Avatar/>
                <ProfileForm/>
                </div>
                <Profile />
            </div>

        </div>
    );
};
export default MyProfile
