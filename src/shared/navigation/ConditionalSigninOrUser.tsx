
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import RSDropdown from "../ui/RSDropdown";
import UserAvatar from "../ui/Avatar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectUser } from "../../redux/features/auth/auth.slice";
import { useAuth } from "../../Utils/useAuthHelper";

const ConditionalSigninOrUser = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  
  const {logout:firebaseUserLogout} = useAuth()

  const handleSignOut = () => {
    dispatch(logout());
    firebaseUserLogout()
  };

  
  return (
    <>
      {user ? (
        <>
          <RSDropdown handleSignOut={handleSignOut}>
            <UserAvatar />
          </RSDropdown>
        </>
      ) : (
        <NavLink
          className={`p-2 px-5 text-[white] bg-primaryColor text-white transition-all duration-700 rounded-full`}
          to="/sign-in"
        >
          Sign in
        </NavLink>
      )}
    </>
  );
};

export default ConditionalSigninOrUser;
