import ProfileDetails from "./ProfileDetails/ProfileDetails";
import UserImage from "./ProfileDetails/user/UserImage.jsx";
import Edit from "./Edit/Edit";
import { createContext } from "react";
import { UserName } from "../../../Utils/user/index.jsx";

export const UserProfileContext = createContext(null)

const UserInfo = () => {


    const user = {
        user:''
    }


    return (
        <UserProfileContext.Provider value={user}>
            <>
                <div>
                    <div className="relative h-40 mb-16 ">
                        <div className=" relative flex w-ful h-full items-center gap-3 gradient p-2 rounded-md animate-pulse">

                        </div>

                        {/* profile image */}
                        <div className="relative h-24 w-24">
                            <UserImage />
                            <Edit />
                        </div>
                    </div>

                    <div className="ml-16">
                        <h1 className="text-2xl text-[#353535]">{UserName()}</h1>
                        <p className="text-[gray] text-[20px]">foundar/CEO</p>

                        <ProfileDetails />
                    </div>



                </div>

            </>
        </UserProfileContext.Provider>
    );
};

export default UserInfo;