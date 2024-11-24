import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React, { useState } from "react";
import { useGetAllOrdersQuery } from "../../../../../redux/features/order/orderApi";
import { useAppSelector } from "../../../../../redux/hooks";
import { selectUser } from "../../../../../redux/features/auth/auth.slice";
import OrderSkeleton from "./OrderSkeleton";
import NoDataFound from "../../../../../shared/ui/NoDataFound";

const PurchaseOrderLayout = () => {
  const [page, setPage] = useState(1);
  const user = useAppSelector(selectUser);
  const { data, isLoading } = useGetAllOrdersQuery([
    { name: "status", value: "confirmed" },
    { name: "user", value: user?.userId },
    { name: "page", value: page },
    { name: "limit", value: 10 },
    { name: "sort", value: "-createdAt" },
  ]);

  const orderData = data?.data?.result;
  const meta = data?.data?.data?.meta;

  // creating a shape for order list data
  const purchaseList = orderData?.map((order) => ({
    id: order?._id,
    title: order?.food?.foodName,
    img: `${order?.food?.foodImage}`,
    price: order?.food?.price,
  }));

  if (isLoading) return <OrderSkeleton />;
  return (
    <div>
      <section className="lg:flex gap-4 relative py-8">
        {purchaseList.length > 0 ? (
          <div className="lg:w-2/3 gap-4 grid grid-cols-2 lg:grid-cols-3">
            {purchaseList?.map((item, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => console.log("item pressed")}
                className={`!flex relative h-48`}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.title}
                    className="w-full object-cover h-[140px]"
                    src={item.img}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{item.title}</b>
                  <div className="flex items-center gap-2">
                    <p className="text-default-500">${item.price}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex justify-center ml-0 md:ml-20">
            <NoDataFound />
          </div>
        )}
      </section>
    </div>
  );
};

export default PurchaseOrderLayout;
