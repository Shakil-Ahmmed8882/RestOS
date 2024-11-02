import React, { useState } from "react";
import {
  Navbar,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Avatar,
} from "@nextui-org/react";

import { BsMenuApp, BsSearch } from "react-icons/bs";
import SearchBar from "../../../../shared/ui/SearchBar";
import ModalWrapper from "../../../../shared/ui/wrapper/ModalWrapper";
import AppDropdown from "../../../../shared/ui/wrapper/AppDropdown";

import Notification from "./components/Notification";
import TodaySpecial from "./components/TodaySpecial";
import { items } from "./data";
import { useAuth } from "../../../../Utils/useAuthHelper";
import { useAppDispatch } from "../../../../redux/hooks";
import { toggleMenu } from "../../../../redux/features/global/menuSlice";
import { CiMenuFries } from "react-icons/ci";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const menuItems = [{ label: "Menu", icon: <BsMenuApp /> }];
  const { user } = useAuth();
  
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
  const dispatch = useAppDispatch()


  return (
    <Navbar
      maxWidth="full"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem className="flex items-center gap-3">
          <h2 className="font-bold text-[#c2c2c2] italic">Dashboard</h2>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
      <NavbarItem className="flex items-center gap-3">

          <ModalWrapper
            isActionButton={false}
            size="4xl"
            triggerElement={<BsSearch className="cursor-pointer size-5" />}
          >
            <SearchBar onChange={handleSearchChange} placeholder="Search..." />
          </ModalWrapper>
        </NavbarItem> 
        <NavbarItem className="hidden lg:flex">
          <Notification />
        </NavbarItem>

        <NavbarItem>
          <TodaySpecial />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <AppDropdown
            triggerElement={
              <Avatar
                src={user && user.photoURL}
                size="sm"
                className="cursor-pointer"
              />
            }
            items={items}
          />
        </NavbarItem>
        <CiMenuFries
          onClick={() => dispatch(toggleMenu())}
          className="text-2xl md:hidden cursor-pointer"
        />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link href="#" className="w-full" size="lg">
              {item.icon} {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
