import { Skeleton } from "@nextui-org/react";
import React from "react";
import Container from "../../../../shared/layouts/Container";

const FoodDetailsSkeleton = () => {
  return (
    <Container>
      <section className="grid grid-cols-2 opacity-60 gap-3">
        <Skeleton className=" w-full h-screen animate-pulse"></Skeleton>
        <div className="space-y-3">
          <Skeleton className=" w-full h-16 animate-pulse"></Skeleton>
          <Skeleton className=" w-1/2 h-6 animate-pulse"></Skeleton>
          <Skeleton className=" w-full h-44 animate-pulse"></Skeleton>
          <div className="flex gap-3 items-center ">
            <Skeleton className=" size-10 rounded-full animate-pulse"></Skeleton>
            <Skeleton className=" size-10 rounded-full animate-pulse"></Skeleton>
            <Skeleton className=" size-10 rounded-full animate-pulse"></Skeleton>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default FoodDetailsSkeleton;
