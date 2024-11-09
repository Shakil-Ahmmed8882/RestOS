import React, { useState } from "react";
import { useAuth } from "../../../../Utils/useAuthHelper";
import ProfileAvatar from "./components/ProfileAvatar";
import ProfileName from "./components/ProfileName";
import ProfileInfo from "./components/ProfileInfo";
import ProfileCompletion from "./components/ProfileCompletion";


export default function Profile() {
  const { user, updateUserInfo, loading: profileUpdateLoading } = useAuth();
  const [name, setName] = useState(user?.displayName || "");

  return (
    <div className=" lg:p-6 space-y-6">
      <div className="flex flex-col-reverse lg:flex-row  justify-between items-start">
        <div className="w-full">
          <div className="flex items-center lg:gap-6">
            <ProfileAvatar
              user={user}
              updateUserInfo={updateUserInfo}
              profileUpdateLoading={profileUpdateLoading}
            />
            <ProfileName
              user={user}
              name={name}
              setName={setName}
              updateUserInfo={updateUserInfo}
            />
          </div>
          <ProfileInfo />
        </div>
        <ProfileCompletion />
      </div>
    </div>
  );
}
