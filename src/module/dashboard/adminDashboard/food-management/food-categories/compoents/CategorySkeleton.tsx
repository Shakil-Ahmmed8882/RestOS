import { Skeleton } from "@nextui-org/react";
import React from "react";

const CategorySkeleton = () => {
  return (
    <section className="grid justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Skeleton  className=" size-80 md:size-44 lg:size-56 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" size-80 md:size-44 lg:size-56 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" size-80 md:size-44 lg:size-56 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" size-80 md:size-44 lg:size-56 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" size-80 md:size-44 lg:size-56 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" size-80 md:size-44 lg:size-56 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" size-80 md:size-44 lg:size-56 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" size-80 md:size-44 lg:size-56 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" size-80 md:size-44 lg:size-56 rounded-lg animate-pulse"></Skeleton>
        <Skeleton  className=" size-80 md:size-44 lg:size-56 rounded-lg animate-pulse"></Skeleton>

    </section>
  );
};

export default CategorySkeleton;