import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function BlogPageSkeleton() {
  return (
    <div className="space-y-16">
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
    </div>
  );
}

const BlogSkeleton = () => {
  return (
    <div className=" w-full space-y-3 animate-pulse">
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-72 rounded-lg"></Skeleton>
      </div>
      <div className="w-full flex  gap-2">
        <Skeleton className="w-2/3 h-5  "></Skeleton>
      </div>
      <div className="w-full flex  gap-2">
        <Skeleton className="w-full h-5  "></Skeleton>
      </div>
      <div className="flex justify-between w-full">
        <div className="w-full flex   gap-2">
          <Skeleton className="size-11  rounded-full"></Skeleton>
          <Skeleton className="size-11  rounded-full"></Skeleton>
          <Skeleton className="size-11  rounded-full"></Skeleton>
        </div>
      </div>
    </div>
  );
};
