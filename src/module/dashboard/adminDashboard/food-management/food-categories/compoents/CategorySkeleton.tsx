import { Skeleton } from "@nextui-org/react";
import React from "react";

const CategorySkeleton = () => {
  return (
    <section className="flex gap-5 flex-wrap">
        <Skeleton className="w-36 h-40 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className="w-36 h-40 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className="w-36 h-40 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className="w-36 h-40 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className="w-36 h-40 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className="w-36 h-40 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className="w-36 h-40 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className="w-36 h-40 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className="w-36 h-40 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className="w-36 h-40 rounded-lg animate-pulse"></Skeleton>

    </section>
  );
};

export default CategorySkeleton;