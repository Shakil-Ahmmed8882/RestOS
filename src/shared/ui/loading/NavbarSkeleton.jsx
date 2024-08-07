import { Skeleton } from "@nextui-org/react";
import React from "react";

const NavbarSkeleton = () => {
  return (
    <div className="flex w-full gap-4 max-w-6xl mx-auto">
      <Skeleton className="my-3 h-10 w-32 rounded-lg ">
        <div className="h-8  w-8 rounded-full bg-default-300"></div>
      </Skeleton>
      <Skeleton className="my-3 w-full">
        <div className=" rounded-full bg-default-300"></div>
      </Skeleton>
      <Skeleton className="my-3 size-10 w-11 rounded-full ">
        <div className="h-8  w-8 rounded-full bg-default-300"></div>
      </Skeleton>
    </div>
  );
};

export default NavbarSkeleton;
