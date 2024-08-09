import React from "react";
import Logo from "../ui/Logo";
import { NavLink } from "react-router-dom";
import { homePagePaths } from "../../Routes/homePageRoutes";
import ConditionalSigninOrUser from "./ConditionalSigninOrUser";

const Navbar = () => {
  const user = true;
  return (
    <header className="flex justify-between w-full max-w-6xl mx-auto  items-center h-16 bg-transparent">
      <Logo />
      <article className="hidden md:flex  items-center gap-2">
        {homePagePaths?.map((route) => {
          if (route && route.name && route.name !== "Sign In") {
            return (
              <>
                <NavLink
                  key={route.name}
                  className={`${route?.className}
                            p-2 px-5  transition-all duration-700 rounded-full`}
                  to={route?.path}
                >
                  {route.name}
                </NavLink>
              </>
            );
          }
        })}

        <ConditionalSigninOrUser/>
      </article>
    </header>
  );
};

export default Navbar;
