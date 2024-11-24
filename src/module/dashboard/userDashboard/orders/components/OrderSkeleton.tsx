import { Skeleton } from "@nextui-org/react";
import React from "react";

const OrderSkeleton = () => {
  return (
    <div className="md:grid grid-cols-7 opacity-60 gap-6 mt-8">
      <section className="grid col-span-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
        <Skeleton className=" w-full h-44 rounded-lg animate-pulse"></Skeleton>
      </section>
      <div className="hidden md:block col-span-2">
      <Skeleton className=" w-full h-screen rounded-lg animate-pulse"></Skeleton>

      </div>
    </div>
  );
};

export default OrderSkeleton;
