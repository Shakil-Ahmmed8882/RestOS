import React from "react";
import { Pagination } from "@nextui-org/react";

const CustomPagination = ({ total, limit, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / limit); 

  return (

    <div className="flex pl-4 w-full">
        <Pagination
      showControls
      total={totalPages}
      initialPage={currentPage}
      page={currentPage}
      classNames={{
        wrapper: "gap-0 overflow-visible h-8 rounded border mt-8  border-divider",
        item: "w-8 h-8 text-small rounded-none bg-transparent",
        cursor:
          "!bg-gradient-to-r !text-[white] from-primaryColor/80 to-[#43ef52]  ",
      }}
      onChange={onPageChange}
    />
    </div>
  );
};

export default CustomPagination;
