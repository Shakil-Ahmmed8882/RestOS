import { Skeleton } from "@nextui-org/react";
import React from "react";

const MyBlogSkeleton = () => {
  return (
    <section className="w-full space-y-3 col-span-2">
      <div>
        <Skeleton className="h-56  rounded-lg w-full" />
        <div className="flex gap-3 items-center mt-3">
          <Skeleton className="  rounded-full size-10" />
          <Skeleton className="  rounded-full size-10" />
          <Skeleton className="  rounded-full size-10" />
        </div>
      </div>
      <div>
        <Skeleton className="h-56  rounded-lg w-full" />
        <div className="flex gap-3 items-center mt-3">

          <Skeleton className="  rounded-full size-10" />
          <Skeleton className="  rounded-full size-10" />
          <Skeleton className="  rounded-full size-10" />
        </div>
      </div>
      <div>
        <Skeleton className="h-56  rounded-lg w-full" />
        <div className="flex gap-3 items-center mt-3">
          <Skeleton className="  rounded-full size-10" />
      
          <Skeleton className="  rounded-full size-10" />
          <Skeleton className="  rounded-full size-10" />
        </div>
      </div>
      <div>
        <Skeleton className="h-56  rounded-lg w-full" />
        <div className="flex gap-3 items-center mt-3">
          <Skeleton className="  rounded-full size-10" />
          <Skeleton className="  rounded-full size-10" />
          <Skeleton className="  rounded-full size-10" />
        </div>
      </div>

    </section>
  );
};

export default MyBlogSkeleton;
