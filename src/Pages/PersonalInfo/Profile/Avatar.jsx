
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import UserImage from "./ProfileDetails/user/UserImage.jsx";
import Edit from "./Edit/Edit";
import { createContext, useState } from "react";
import { UserName } from "../../../Utils/user/index.jsx";
import EventAndLinks from "./ProfileDetails/event&quicklinks/EventAndLinks.jsx";
import Tabs from "./Tabs/Tabs.jsx";
import InitialAnimateContainer from "../../../Components/Shared/animation/InitialAnimateContainer.jsx";

export const UserProfileContext = createContext(null);

const UserInfo = () => {
  const user = {
    user: "",
  };


  return (
    <UserProfileContext.Provider value={user}>
      <InitialAnimateContainer>
        <div className="sticky top-0">
          <div className="relative h-40 mb-16 ">
            <div className=" relative flex w-ful h-full items-center gap-3 gradient p-2 rounded-md animate-pulse"></div>

            {/* profile image */}
            <div className="relative h-24 w-24">
              <UserImage />
              <Edit />
            </div>
          </div>

          <div className="ml-16">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl mt-2 mb-1  text-[#353535]">
                  {UserName()}
                </h1>
                <p onClick={()=> setIsClicked(!isClicked)} className="text-[gray] mb-5 text-[20px]">foundar/CEO</p>

              </div>
              <EventAndLinks />
            </div>
            <ProfileDetails />
          </div>
          <Tabs />
        </div>
      </InitialAnimateContainer>
    </UserProfileContext.Provider>
  );
};

export default UserInfo;
