import React from "react";
import Logo from "../ui/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { homePagePaths } from "../../Routes/homePageRoutes";
import ConditionalSigninOrUser from "./ConditionalSigninOrUser";
import GlobalSearch from "../ui/global-search/GlobalSearch";
import { CartIcon } from "../../assets/icons/Icons";
import { useAppSelector } from "../../redux/hooks";
import { selectCartItems } from "../../redux/features/global/cartSlice";

const Navbar = () => {

  const cartItemsCount = useAppSelector(selectCartItems).length
  const navigate = useNavigate()

  return (
    <header className="flex justify-between w-full max-w-6xl rounded-b-lg backdrop-blur-sm bg-[#ffffff79] mx-auto items-center h-16">
      <Logo />
      <article className="hidden md:flex items-center gap-8">
        <GlobalSearch />
        {homePagePaths?.map((route) => {
          if (route && route.name && route.name !== "Sign In") {
            return (
              <NavLink
                key={route.name}
                className={({ isActive }) =>
                  `p-2 ${
                    isActive
                      ? "border-b-2 border-primaryColor text-primaryColor"
                      : ""
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
        <button onClick={()=> navigate("/cart")}>
          <CartIcon count={cartItemsCount} badgeColor={`${cartItemsCount > 0? "bg-primaryColor":"bg-[gray]"}`} />
        </button>
        <ConditionalSigninOrUser />
      </article>
    </header>
  );
};

export default Navbar;
