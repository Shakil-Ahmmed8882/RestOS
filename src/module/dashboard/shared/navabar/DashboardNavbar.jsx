import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
} from "@nextui-org/react";
import { FaClipboardList, FaUserSecret, FaUtensils, FaUtensilSpoon } from "react-icons/fa";
import { BsBell, BsChevronDown } from "react-icons/bs";
import Search from "antd/es/input/Search";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: "Menu", icon: <FaUtensils /> },
    { label: "Orders", icon: <FaClipboardList /> },
    { label: "Staff", icon: <FaUserSecret /> },
    { label: "Today’s Special" },
    { label: "Profile", icon: <BsChevronDown /> },
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* Logo & Navbar Brand */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <FaUtensilSpoon className="h-6 w-6" />
          <p className="font-bold text-inherit">RestaurantDash</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation Links */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <FaUtensilSpoon className="h-6 w-6" />
          <p className="font-bold text-inherit">RestaurantDash</p>
        </NavbarBrand>
        <NavbarItem>
          <Search placeholder="Search orders, menu items..." type="search" className="pl-2" />
        </NavbarItem>
        {menuItems.slice(0, 3).map((item, index) => (
          <NavbarItem key={index} className="gap-2">
            {item.icon}
            <Link href="#">{item.label}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right side of Navbar - Notifications & Avatar */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button aria-label="Notifications">
            <BsBell className="h-5 w-5" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button className="hidden md:flex">Today’s Special</Button>
        </NavbarItem>
        <NavbarItem>
          <Button className="rounded-full border-2" aria-label="Profile">
            <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/placeholder.svg?height=32&width=32"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Dropdown Menu */}
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
