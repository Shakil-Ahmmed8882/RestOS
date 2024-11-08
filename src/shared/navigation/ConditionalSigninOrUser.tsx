// @ts-nocheck
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Utils/useAuthHelper";
import RSDropdown from "../ui/RSDropdown";
import UserAvatar from "../ui/Avatar";
import toast from "react-hot-toast";

const ConditionalSigninOrUser = () => {
    const { user, logOut } = useAuth();
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                toast.success("Signed out");
                setIsLoggedOut(true);
            })
            .catch((err) => toast.error(err.toString()));
    };

    const items = [
        {
            key: "dashboard",
            label: <NavLink className={'flex hover:text-primaryColor p-3 py-3 '} to="/dashboard">Dashboard</NavLink>,
            path: "/dashboard"
        },
        {
            key: "signout",
            label: (
                <NavLink className={'flex hover:text-primaryColor p-3 py-3'} onClick={handleSignOut} to="/">
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
