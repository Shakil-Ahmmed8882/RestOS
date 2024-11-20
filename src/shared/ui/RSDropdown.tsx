import React, { useRef, useState, useEffect } from "react";
import { Space } from "antd";
import useClickOutside from "../../🔗Hook/useClickOutside";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/auth/auth.slice";
import { USER_ROLE } from "../../constants";

const RSDropdown = ({ children = <></>, handleSignOut }) => {
  const [reveal, setReveal] = useState(false);
  const dropdownRef = useRef(null);
  const authStateUser = useAppSelector(selectUser);
  const url = `${authStateUser?.role === USER_ROLE.ADMIN ? "admin" : "user"}`;

  // Handle clicks outside the dropdown to close it
  useClickOutside(dropdownRef, () => setReveal(false));

  const items = [
    {
      key: "dashboard",
      label: (
        <NavLink
          className={"flex hover:text-primaryColor p-3 py-3 "}
          to={`${url}/dashboard`}
        >
          Dashboard
        </NavLink>
      ),
    },
    {
      key: "signout",
      label: (
        <NavLink
          className={"flex hover:text-primaryColor p-3 py-3"}
          onClick={handleSignOut}
          to="/"
        >
          Sign out
        </NavLink>
      ),
    },
  ];

  return (
    <div ref={dropdownRef}>
    <Space className="relative rounded-lg">
      <p onClick={() => setReveal(!reveal)}>{children}</p>
      <div>
        {reveal && (
          <div
            onClick={() => setReveal(false)}
            className="absolute right-0 top-8 z-40 bg-[white] w-[250px] bg-white shadow-lg"
          >
            {items?.map((item) => (
              <div
                key={item.key}
                className="transition-all w-full duration-300 hover:bg-[#f8f8f8]"
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </Space>

    </div>
  );
};

export default RSDropdown;

