import { Skeleton, Spinner } from "@nextui-org/react";
import React from "react";

const TopSellingFoodSkeleton = () => {
  return (
    <div className="h-[120vh] bg-[white] py-16">
      {/* ================= */}
      <div className="grid grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[{ className: "!h-full col-span-2 row-span-2" }, 2, 3, 4, 5, 6]?.map(
          (item,index) => (
            <Skeleton
            key={index}
              className={`${
                // @ts-ignore
                item.className
              } h-44 rounded-lg`}
            ></Skeleton>
          )
        )}
      </div>
      {/* ================= */}
    </div>
  );
};

export default TopSellingFoodSkeleton;
