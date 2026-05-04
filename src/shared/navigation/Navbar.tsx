import React from "react";
import Logo from "../ui/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { homePagePaths } from "../../Routes/homePageRoutes";
import ConditionalSigninOrUser from "./ConditionalSigninOrUser";
import GlobalSearch from "../ui/global-search/GlobalSearch";
import { CartIcon } from "../../assets/icons/Icons";
import { useAppSelector } from "../../redux/hooks";
import { selectCartItems } from "../../redux/features/global/cartSlice";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const cartItemsCount = useAppSelector(selectCartItems).length;
  const navigate = useNavigate();

  return (
    <header
      className={`flex justify-between w-full max-w-6xl rounded-b-2xl mx-auto items-center h-16 px-4 backdrop-blur-md transition-colors duration-300 ${
        dark
          ? "bg-gray-950/80 border-b border-gray-800/60 text-gray-100"
          : "bg-white/80 border-b border-gray-100/80 text-gray-800"
      }`}
    >
      <Logo />

      <article className="hidden md:flex items-center gap-6">
        <GlobalSearch />
        {homePagePaths?.map((route) => {
          if (route && route.name && route.name !== "Sign In") {
            return (
              <NavLink
                key={route.name}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-emerald-500 border-b-2 border-emerald-500"
                      : dark
                        ? "text-gray-300 hover:text-emerald-400"
                        : "text-gray-600 hover:text-emerald-600"
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

        <button
          onClick={() => navigate("/cart")}
          className={`relative transition-transform hover:scale-110 duration-200 ${dark ? "text-gray-300" : "text-gray-600"}`}
        >
          <CartIcon
            count={cartItemsCount}
            badgeColor={cartItemsCount > 0 ? "bg-emerald-500" : "bg-gray-400"}
          />
        </button>

        <ConditionalSigninOrUser />
      </article>
    </header>
  );
};

export default Navbar;
