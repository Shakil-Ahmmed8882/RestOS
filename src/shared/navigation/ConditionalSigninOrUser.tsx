// @ts-nocheck
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Utils/useAuthHelper";
import RSDropdown from "../ui/RSDropdown";
import UserAvatar from "../ui/Avatar";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectUser } from "../../redux/features/auth/auth.slice";

const ConditionalSigninOrUser = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleSignOut = () => {
    dispatch(logout());
  };

  const items = [
    {
      key: "dashboard",
      label: (
        <NavLink
          className={"flex hover:text-primaryColor p-3 py-3 "}
          to={
            import.meta.env.VITE_USER_ROLE === "USER"
              ? "/dashboard"
              : "/admin/dashboard"
          }
        >
          Dashboard
        </NavLink>
      ),
      path:
        import.meta.env.VITE_USER_ROLE == "USER"
          ? "/dashboard"
          : "/admin/dashboard",
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
