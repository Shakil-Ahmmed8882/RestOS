import { Skeleton } from "@nextui-org/react";
import React from "react";

const CategorySkeleton = () => {
  return (
    <section className="grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton  className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>

    </section>
  );
};

export default CategorySkeleton;