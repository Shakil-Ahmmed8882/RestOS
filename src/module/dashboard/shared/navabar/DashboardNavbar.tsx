import React, { useState } from "react";
import {
  Navbar,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Avatar,
  Link,
} from "@nextui-org/react";

import {
  SearchBar,
  ModalWrapper,
  AppDropdown,
  Notification,
  TodaySpecial,
  items,
  useAuth,
  useAppDispatch,
  toggleMenu,
  BsMenuApp,
  CiMenuFries,
} from ".";
import GlobalSearch from "../../../../shared/ui/global-search/GlobalSearch";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const menuItems = [{ label: "Menu", icon: <BsMenuApp /> }];

  return (
    <Navbar
      maxWidth="full"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Mobile Navbar Menu Toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Center Content */}
      <NavbarContent className="hidden sm:flex gap-4 -ml-5" justify="center">
        <NavbarItem>
          <h2 className="font-bold text-light-gray italic">Dashboard</h2>
        </NavbarItem>
      </NavbarContent>

      {/* Right Content */}
      <NavbarContent justify="end">
        {/* Search Icon with Modal */}
        <NavbarItem>
        <GlobalSearch/>
        </NavbarItem>

        {/* Notification Icon (visible on larger screens) */}
        <NavbarItem className="hidden lg:flex">
          <Notification />
        </NavbarItem>

        {/* Today’s Special */}
        <NavbarItem>
          <TodaySpecial />
        </NavbarItem>

        {/* User Avatar with Dropdown */}
        <NavbarItem className="hidden lg:flex">
          <AppDropdown
            triggerElement={
              <Avatar
                src={user?.photoURL}
                size="sm"
                className="cursor-pointer"
              />
            }
          />
        </NavbarItem>

        {/* Mobile Sidebar Menu Toggle */}
        <CiMenuFries
          onClick={() => dispatch(toggleMenu())}
          className="text-2xl md:hidden cursor-pointer"
        />
      </NavbarContent>

      {/* Sidebar Menu */}
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
