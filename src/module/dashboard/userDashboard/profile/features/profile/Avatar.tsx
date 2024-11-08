// @ts-nocheck

import { createContext, useState } from "react";
import ProfileDetails from "./ProfileDetails.js";
import Edit from "./Edit.js";
import { UserName } from "../../utils/index.jsx";


import Tabs from "../../components/Tabs/Tabs.jsx";
import React from "react";
import UserImage from "../../components/UserImage.jsx";
import InitialAnimateContainer from "../../../../../../shared/animations/InitialAnimateContainer.js";
import EventAndLinks from "../event/EventAndLinks.jsx";

export const UserProfileContext = createContext(null);

const UserInfo = () => {
  const user = {
    user: "",
  };

  return (
    <UserProfileContext.Provider value={user}>
      <InitialAnimateContainer>
        <div className="relative">
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
                <p
                  onClick={() => setIsClicked(!isClicked)}
                  className="text-[gray] mb-5 text-[20px]"
                >
                  foundar/CEO
                </p>
              </div>
              <EventAndLinks />
            </div>
            <ProfileDetails />
          </div>
        </div>
          <Tabs />
      </InitialAnimateContainer>
    </UserProfileContext.Provider>
  );
};

export default UserInfo;
