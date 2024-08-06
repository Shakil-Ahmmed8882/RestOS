import { Skeleton } from "@nextui-org/react";

import React from "react";

const FoodPageSpinner = () => {
  return (
    <div className="">
      <div className="">
        <Skeleton>
          <div className="min-h-[70vh] w-full rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <div className="mt-8">  
            <div className=" hidden md:grid grid-cols-2 justify-center w-96 mx-auto">

      <Skeleton className="w-44 h-4 mb-8">
          <div className="  rounded-lg bg-default-300"></div>
        </Skeleton>
      <Skeleton className="w-44 h-4 mb-8">
          <div className="  rounded-lg bg-default-300"></div>
        </Skeleton>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Skeleton>
          <div className="min-h-[70vh] w-full rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton>
          <div className="min-h-[70vh] w-full rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton>
          <div className="min-h-[70vh] w-full rounded-lg bg-default-300"></div>
        </Skeleton>

            </div>
      </div>
    </div>
  );
};

export default FoodPageSpinner;
