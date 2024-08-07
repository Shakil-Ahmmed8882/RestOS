// @ts-nocheck
import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "next-themes";
import { useAuth } from "../../../Utils/useAuthHelper";
import toast from "react-hot-toast";
import { useGetData } from "../../../🔗Hook/httpRequests";
import React from "react";
import Logo from "../../../shared/ui/Logo";

export function NavBar() {
  const { user, logOut } = useAuth();
  const { theme } = useTheme();
  const [isLoggedOut, setIsLoggedOut] = useState(!user);

  useEffect(() => {
    if (!user) {
      setIsLoggedOut(true);
    } else {
      setIsLoggedOut(false);
    }
  }, [user]);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Signed out");
        setIsLoggedOut(true);
      })
      .catch((err) => toast.error(err.toString()));
  };

  const adminRoutes = [
    { key: "added-food", label: "Added Food", to: "/added-food" },
    { key: "add-food", label: "Add Food", to: "/add-food" },
    { key: "Allorderlist", label: "All orders", to: "/Allorderlist" },
    {
      key: "all-purchasedlist",
      label: "All purchased list",
      to: "/all-purchased-list",
    },
    { key: "mobile-bradcrump", label: "More Routes", to: "/mobile-bradcrump" },
  ];

  const userRoutes = [
    { key: "my-profile", label: "Profile", to: "/profile" },
    { key: "orderlist", label: "Order List", to: "/orderlist" },
    { key: "purchasedList", label: "Purchased List", to: "/purchasedList" },
    { key: "mobile-bradcrump", label: "More Routes", to: "/mobile-bradcrump" },
  ];

  const { data } = useGetData({
    endpoint: `/isAdmin?email=${user?.email}`,
    key: [user?.email],
  });
  // const isAdmin = true
  const isAdmin = data?.isAdmin;

  const routesToShow = !isAdmin ? userRoutes : adminRoutes;

  const dropDownItems = {
    width: "200px",
    paddingRight: "140px",
    paddingBlock: "60px",
  };

  return (
    <Navbar
      maxWidth="full"
      // @ts-ignore
      isBlurred="true"
      className="bg-transparent hidden md:flex"
    >
      <NavbarBrand className="md:pl-20">
        <Logo />
      </NavbarBrand>

      <NavbarContent
        className={`displayFlex hidden gap-4 ${
          theme === "dark" ? "text-[white]" : ""
        }`}
        justify="center"
      >
        <NavLink
          //  exact
          to="/"
          activeclassname="active"
          className="flex items-center"
        >
          <span>Home</span>
        </NavLink>

        <NavLink to="/food" activeclassname="active">
          Food
        </NavLink>

        <NavLink to="/faq" activeclassname="active">
          FAQ
        </NavLink>

        <NavLink to="/blog" activeclassname="active">
          Blog
        </NavLink>
        <NavLink to="/recipe/new" activeclassname="active">
          Recipe
        </NavLink>
        <NavLink to="/dashboard" activeclassname="active">
          Dashboard
        </NavLink>
        {user && !isLoggedOut ? (
          ""
        ) : (
          <NavLink to="/sign-in" activeclassname="active">
            Sign in
          </NavLink>
        )}
      </NavbarContent>
      <ThemeSwitcher></ThemeSwitcher>

      {user && !isLoggedOut && (
        <NavbarContent as="div" className="md:pr-20" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={
                  user.photoURL
                    ? user.photoURL
                    : "https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png"
                }
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              className={`${
                theme == "dark" ? "bg-[black] text-[white]" : ""
              } py-3`}
              variant="flat"
            >
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold my-1">Signed in as</p>
                <p className="font-semibold mb-2">
                  {user.email}{" "}
                  <span className="text-accent">
                    ({isAdmin ? "Admin" : "User"})
                  </span>
                </p>
              </DropdownItem>

              {routesToShow.map((route) => (
                <DropdownItem key={route.key}>
                  <Link style={dropDownItems} to={route.to}>
                    {route.label}
                  </Link>
                </DropdownItem>
              ))}

              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                <Link style={dropDownItems} onClick={handleSignOut} to="/">
                  Sign out
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
    </Navbar>
  );
}
