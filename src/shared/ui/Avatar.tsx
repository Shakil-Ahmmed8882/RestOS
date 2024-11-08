import React from "react";

import { useAuth } from "../../Utils/useAuthHelper";
import { Avatar } from "@nextui-org/react";

const UserAvatar = () => {
  const { user } = useAuth();

  return (
    <>
      <Avatar
        src={user?.photoURL}
        size="sm"
        className="border-3 border-[#efefef] cursor-pointer"
      ></Avatar>
    </>
  );
};

export default UserAvatar;
