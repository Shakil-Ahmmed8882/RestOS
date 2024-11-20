
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import RSDropdown from "../ui/RSDropdown";
import UserAvatar from "../ui/Avatar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectToken, selectUser } from "../../redux/features/auth/auth.slice";
import verifyToken from "../../helpers/verifyToken";
import { USER_ROLE } from "../../constants";
import { useAuth } from "../../Utils/useAuthHelper";

const ConditionalSigninOrUser = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  
  const {logout:firebaseUserLogout} = useAuth()
  const url = `${user?.role === USER_ROLE.ADMIN ? "admin" : "user"}`;

  const handleSignOut = () => {
    dispatch(logout());
    firebaseUserLogout()
  };

  const items = [
    {
      key: "dashboard",
      label: (
        <NavLink
          className={"flex hover:text-primaryColor p-3 py-3 "}
          to={
            `${url}/dashboard`
          }
        >
          Dashboard
        </NavLink>
      ),
    },
    {
      key: "signout",
      label: (
        <NavLink
          className={"flex hover:text-primaryColor p-3 py-3"}
          onClick={handleSignOut}
          to="/"
        >
          Sign out
        </NavLink>
      ),
    },
  ];

  return (
    <>
      {user ? (
        <>
          <RSDropdown items={items}>
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
