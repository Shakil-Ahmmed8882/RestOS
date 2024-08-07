// @ts-nocheck
import React from "react";
import { useAuth } from "../../../Utils/useAuthHelper";

const UserAvater = ({ size = "size-10" }) => {
  const { user } = useAuth();
  return (
    <>
      {" "}
      {user?.photoURL ? (
        <img
          className={`${size} rounded-full border border-[white]`}
          src={user?.photoURL}
          alt=""
        />
      ) : (
        <span className={`${size} block  rounded-full bg-primaryColor`}></span>
      )}
    </>
  );
};
export default UserAvater;
