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
          status === "confirmed"
            ? "bg-[#f0fff2] text-primaryColor"
            : "bg-[#ffeef7] text-deepPink"
        } text-center p-1 rounded-full cursor-pointer px-2`}
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
          <h1 className="bg-primaryColor/10 text-primaryColor p-1 text-xl">Status</h1>
          {["pending","confirmed","canceled"].map((item) => (
            <p
              key={item}
              onClick={() => onEditStatus(item)}
              className={`${
                item === "confirmed"
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

export default StatusDropdown;
