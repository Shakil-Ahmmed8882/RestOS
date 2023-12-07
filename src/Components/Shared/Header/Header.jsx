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
import logo from "../../../assets/img/restOSLogo.png";
import { Link, NavLink } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "next-themes";

// import home_light_icon from '../../../assets/img/homeIcon.png'
// import home_dark_icon from '../../../assets/img/home-dark-icon.png'
import { useAuth } from "../../../Utils/useAuthHelper";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function NavBar() {
  const { theme } = useTheme();
  // const themeColor = theme == 'dark'?' text-white':''
  const { user, logOut } = useAuth();
  const [isLoggedOut, setIsLoggedOut] = useState(!user);

  useEffect(() => {
    if (!user) {
      setIsLoggedOut(true);
    } else {
      setIsLoggedOut(false);
    }
  }, [user]);
  // handling logout here
  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Signed out");
        setIsLoggedOut(true);
      })
      .catch((err) => toast.error(err.toString()));
  };

  const dropDownItems = {
    width: "200px",
    paddingRight: "140px",
    paddingBlock: "60px",
  };

  return (
    <Navbar maxWidth="full" isBlurred="true">
      <NavbarBrand className="pl-20">
        <div className="flex gap-1 items-center">
          <img className="w-[42px]" src={logo} alt="" />
          <p className="flex font-bold  items-center text-[19px]">
            <span className={` ${theme === "dark" ? "text-[white]" : ""}`}>
              Rest
            </span>
            <span className="text-primaryColor text-[18px]">OS</span>
          </p>
        </div>
      </NavbarBrand>

      <NavbarContent
        className={`displayFlex hidden gap-4 ${
          theme === "dark" ? "text-[white]" : ""
        }`}
        justify="center">
        <NavLink
          exact
          to="/"
          activeClassName="active"
          className="flex items-center ">
          <span>Home</span>
        </NavLink>

        <NavLink to="/food" activeClassName="active">
          Food
        </NavLink>

        <NavLink to="/blog" activeClassName="active">
          Blog
        </NavLink>
        {user && !isLoggedOut ? (
          ""
        ) : (
          <NavLink to="/sign-in" activeClassName="active">
            Sign in
          </NavLink>
        )}
      </NavbarContent>
      <ThemeSwitcher></ThemeSwitcher>

      {user && !isLoggedOut && (
        <NavbarContent as="div" className="pr-20" justify="end">
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
              variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="my-profile">
                <Link style={dropDownItems} to="/profile">
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem key="added-food">
                <Link style={dropDownItems} to="/added-food">
                  Added Food
                </Link>
              </DropdownItem>
              <DropdownItem key="add-food">
                <Link style={dropDownItems} to="/add-food">
                  Add Food
                </Link>
              </DropdownItem>
              <DropdownItem key="system">
                <Link style={dropDownItems} to="/orderlist">
                  Order list
                </Link>
                =
              </DropdownItem>
              <DropdownItem key="configurations">
                {" "}
                <Link style={dropDownItems} to="/mobile-bradcrump">
                  More routes
                </Link>
              </DropdownItem>
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
