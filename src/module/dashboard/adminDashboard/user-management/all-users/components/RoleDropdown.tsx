import React from "react";
import { motion } from "framer-motion";

interface RoleDropdownProps {
  role: string;
  record: any;
  hoveredRow: string | null;
  setHoveredRow: React.Dispatch<React.SetStateAction<string | null>>;
  dropdownType: string;
  setDropdownType: React.Dispatch<React.SetStateAction<string>>;
  onEditRole: (role: string) => void;
}

const RoleDropdown: React.FC<RoleDropdownProps> = ({
  role,
  record,
  hoveredRow,
  setHoveredRow,
  dropdownType,
  setDropdownType,
  onEditRole
}) => {
  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setHoveredRow(record._id);
        setDropdownType("role");
      }}
      onMouseLeave={() => setHoveredRow(null)}
    >
      <div
        className={`${
          role === "ADMIN"
            ? "bg-[#f0fff2] text-primaryColor"
            : "bg-[#ffeef7] text-deepPink"
        } text-center p-1 rounded-full cursor-pointer`}
      >
        {role}
      </div>
      {hoveredRow === record._id && dropdownType === "role" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute -left-[167px] rounded-md bg-[white] shadow-lg w-[180px] space-y-1 z-10 top-0"
        >
          <h1 className="bg-[#f3f3f3] p-1 text-xl">Role</h1>
          {["ADMIN", "USER"].map((item) => (
            <p
              key={item}
              onClick={() => onEditRole(item)}
              className={`${
                item === "ADMIN"
                  ? "hover:bg-[#f0fff2] hover:text-primaryColor"
                  : "hover:bg-[#ffeef7] hover:text-deepPink"
              } p-2 cursor-pointer`}
            >
              {item}
            </p>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default RoleDropdown;
