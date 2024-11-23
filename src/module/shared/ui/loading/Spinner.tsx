import { Skeleton } from "@nextui-org/react";

import React from "react";
import Container from "../../../../shared/layouts/Container";

const FoodPageSkeleton = () => {
  return (
    <div className="">
      <Container>
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 animate-pulse opacity-60 lg:grid-cols-6 gap-5">
            <Skeleton className="col-span-2 h-screen sticky top-0">
              <div className="min-h-[100vh] w-full rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="col-span-4 grid grid-cols-2 gap-5">
            {
              [1,2,3,4,5,6,7,8,9,10].map( () => (
                <Skeleton className=" h-36">
                <div className="p-4 shadow-sm">
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg"></h3>
                        <p className="text-sm text-gray-500 mt-1"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </Skeleton>
   
              ))
            }

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FoodPageSkeleton;
