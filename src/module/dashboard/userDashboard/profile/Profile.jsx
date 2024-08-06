import React from "react";
import { useAuth } from "../../../../Utils/useAuthHelper";
import UserInfo from "./features/profile/Avatar";

const MyProfile = () => {

  return (
    <div className="pt-4 bg-[white]">
      <div className=" mt-4 md:grid lg:grid md:grid-cols-2 lg:grid-cols-8 gap-3 w-full">
        <div className="col-span-8">
          <UserInfo />
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
