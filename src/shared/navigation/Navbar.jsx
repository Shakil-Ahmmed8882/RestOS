import React from "react";
import Logo from "../ui/Logo";
import { NavLink } from "react-router-dom";
import { homePagePaths } from "../../Routes/homePageRoutes";
import ConditionalSigninOrUser from "./ConditionalSigninOrUser";

const Navbar = () => {
  return (
    <header className="flex justify-between w-full max-w-6xl rounded-b-lg backdrop-blur-sm bg-[#ffffff79] mx-auto items-center h-16">
      <Logo />
      <article className="hidden md:flex items-center gap-8">
        {homePagePaths?.map((route) => {
          if (route && route.name && route.name !== "Sign In") {
            return (
              <NavLink
                key={route.name}
                className={({ isActive }) =>
                  `${route?.className} p-2 ${
                    isActive ? 'border-b-2 border-primaryColor text-primaryColor' : ''
                  }`
                }
                to={route?.path}
              >
                {route.name}
              </NavLink>
            );
          }
          return null;
        })}
        <ConditionalSigninOrUser />
      </article>
    </header>
  );
};

export default Navbar;