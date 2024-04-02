import { NavLink, useLocation } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === address;

  return (
    <NavLink
      to={address}
      end
      className={`flex items-center px-4 py-2  my-5 transition-colors duration-300 transform border-b border-b-[#d2d2d2] hover:bg-[#efefef] ${
        isActive ? "font-bold text-black" : "text-gray-700 bg-[white]"
      }`}
    >
      <li className="flex items-center px-4 py-2">
        {Icon ? (
          <Icon
            className={`font-bold ${
              isActive ? "font-bold text-black" : "text-gray-400"
            } text-[21px]`}
          />
        ) : (
          <span className="bg-primary-color w-2 h-2 rounded-full"></span>
        )}
        <span className="ml-2 text-sm">{label}</span>
      </li>
    </NavLink>
  );
};

export default MenuItem;
