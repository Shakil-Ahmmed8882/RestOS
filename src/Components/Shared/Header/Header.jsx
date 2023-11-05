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
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "next-themes";

export default function NavBar() {
  const {theme} = useTheme()




  return (
    <Navbar>
      <NavbarBrand>
        <div className="flex gap-1 items-center">
          <img className="w-[42px]" src={logo} alt="" />
          <p className="font-bold text-inherit text-[18px]">
            Rest<span className="text-primaryColor text-[18px]">OS</span>
          </p>
        </div>
      </NavbarBrand>

      <NavbarContent className={`displayFlex  hidden gap-4 ${theme === 'dark'?'text-[white]':''}`} justify="center">
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>

        <NavLink to="/food" activeClassName="active">
          Food
        </NavLink>

        <NavLink to="/blog" activeClassName="active">
          Blog
        </NavLink>
        <ThemeSwitcher></ThemeSwitcher>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Favorite</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
