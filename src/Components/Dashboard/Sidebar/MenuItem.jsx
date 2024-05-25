import { NavLink, useLocation } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === address;

  return (
    <NavLink
      to={address}
      className={`flex items-center px-4 py-2  my-5 transition-colors duration-300 transform border-b border-b-[#d2d2d2] hover:bg-[#efefef] ${
        isActive ? "font-bold text-[black]" : "text-description-text bg-[white]"
      }`}
    >
      <li className="flex items-center px-4 py-2">
        {Icon ? (
          <Icon
            className={`font-bold text-[#b0b0b0] text-[26px] ${
              isActive ? "font-bold text-[black]" : "text-[#c6c6c6]"
            } text-[100px]`}
          />
        ) : (
          <span className="bg-primary-color w-2 h-2 rounded-full"></span>
        )}
        <span className="ml-2 ">{label}</span>
      </li>
    </NavLink>
  );
};

export default MenuItem;
