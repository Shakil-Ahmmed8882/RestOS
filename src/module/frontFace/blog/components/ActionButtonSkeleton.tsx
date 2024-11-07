import { Skeleton } from "@nextui-org/react";
import React from "react";

const ActionButtonSkeleton = () => {
  return (
    <div className="flex items-center gap-3 py-3">
         <div className="w-full flex   gap-2">
          <Skeleton className="size-5  rounded-full"></Skeleton>
          <Skeleton className="size-5  rounded-full"></Skeleton>
          <Skeleton className="size-5  rounded-full"></Skeleton>
        </div>
    </div>
  );
};

export default ActionButtonSkeleton;
