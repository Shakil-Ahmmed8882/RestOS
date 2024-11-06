import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function CommentSidebarSkeleton() {
  return (
    <div className="space-y-11 pb-20">
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
    </div>
  );
}

const CommentSkeleton = () => {
  return (
    <div className=" w-full space-y-3 animate-pulse">
      <div className="flex justify-between w-full">
        <div className="w-full flex  items-center gap-2">
          <div>
            <Skeleton className="size-10  rounded-full"></Skeleton>
          </div>
          <div className="w-[80%]  gap-2">
            <Skeleton className="w-2/3 h-2  "></Skeleton>
          <div className="w-full gap-2">
            <Skeleton className="w-full h-2 mt-3  "></Skeleton>
          </div>
          </div>
        </div>
        <div className="w-1/4 flex justify-end  items-center gap-2">
          <div>
            <Skeleton className="w-2 h-6"></Skeleton>
          </div>
        </div>
      </div>
          <div className="w-full flex  gap-2">
            <Skeleton className="w-full h-20  "></Skeleton>
          </div>

    </div>
  );
};
