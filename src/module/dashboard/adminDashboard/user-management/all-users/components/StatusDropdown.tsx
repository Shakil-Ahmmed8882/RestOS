import React from "react";
import { motion } from "framer-motion";

interface StatusDropdownProps {
  status: string;
  record: any;
  hoveredRow: string | null;
  setHoveredRow: React.Dispatch<React.SetStateAction<string | null>>;
  dropdownType: string;
  setDropdownType: React.Dispatch<React.SetStateAction<string>>;
  onEditStatus: (status: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  status,
  record,
  hoveredRow,
  setHoveredRow,
  dropdownType,
  setDropdownType,
  onEditStatus
}) => {
  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setHoveredRow(record._id);
        setDropdownType("status");
      }}
      onMouseLeave={() => setHoveredRow(null)}
    >
      <div
        className={`${
          status === "ACTIVE"
            ? "bg-[#f0fff2] text-green-500"
            : "bg-[#ffeef7] text-red-500"
        } text-center p-1 rounded-full cursor-pointer`}
      >
        {status}
      </div>
      {hoveredRow === record._id && dropdownType === "status" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute -left-44 rounded-md bg-[white] shadow-lg w-[180px] space-y-1 z-20 top-0"
        >
          <h1 className="bg-[#f3f3f3] p-1 text-xl">Status</h1>
          {["ACTIVE", "BLOCKED", "DELETED"].map((item) => (
            <p
              key={item}
              onClick={() => onEditStatus(item)}
              className={`${
                item === "ACTIVE"
                  ? "hover:bg-[#f0fff2] hover:text-green-500"
                  : "hover:bg-[#ffeef7] hover:text-red-500"
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

export default StatusDropdown;
