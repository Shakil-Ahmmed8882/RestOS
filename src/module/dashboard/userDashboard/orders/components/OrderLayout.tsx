import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../../../redux/features/order/orderApi";
import { ConfirmationModal } from "../../../../../shared/modals/ConfirmationModal";
import OrderSummary from "./OrderSummary";
import { useAppSelector } from "../../../../../redux/hooks";
import { selectUser } from "../../../../../redux/features/auth/auth.slice";

import OrderSkeleton from "./OrderSkeleton";
import NoDataFound from "../../../../../shared/ui/NoDataFound";

const OrderLayout = () => {
  const [page, setPage] = useState(1);
  const user = useAppSelector(selectUser);

  const { data, isLoading } = useGetAllOrdersQuery([
    { name: "status", value: "pending" },
    { name: "user", value: user?.userId },
    { name: "page", value: page },
    { name: "limit", value: 10 },
    { name: "sort", value: "-createdAt" },
  ]);

  const orderData = data?.data?.result;
  const meta = data?.data?.data?.meta;

  // creating a shape for order list data
  const orderList = orderData?.map((order) => ({
    id: order?._id,
    title: order?.food?.foodName,
    img: `${order?.food?.foodImage}`,
    price: order?.food?.price,
  }));

  // state to show delete modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [
    deleteOrder,
    { isLoading: isDeleteOrderLoading, isSuccess: isDeleteOrderSuccess },
  ] = useDeleteOrderMutation();

  // get id from order want to delete
  // delte order id and selected order match show loading
  // once deleted set select order id null to stop loading and order get removed
  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId);
      onOpenChange();
      if (isDeleteOrderLoading && isDeleteOrderSuccess) {
        setSelectedOrderId(null);
      }
    } catch (error) {}
  };

  // handle order delete cancel
  const handleDeleteCancel = async () => {
    setSelectedOrderId(null);
    onOpenChange();
  };

  if (isLoading) return <OrderSkeleton />;

  return (
    <div>
      <section className="lg:flex gap-4 relative py-8 min-h-[50vh]">
        <ConfirmationModal
          isOpen={isOpen}
          onConfirm={() => handleDelete(selectedOrderId)}
          onOpenChange={onOpenChange}
          onCancel={handleDeleteCancel}
          title="Confirm Deletion"
          message="Are you sure you want to delete this item? This action cannot be undone."
        />
        {orderList?.length > 0 ? (
          <div className="lg:w-2/3 gap-4 grid grid-cols-2 lg:grid-cols-3">
            {orderList.map((item, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => console.log("item pressed")}
                className={`!flex relative h-48`}
              >
                <div
                  className={`${
                    selectedOrderId === item.id
                      ? "absolute bg-[#ffffffe7] inset-0 z-30"
                      : ""
                  }`}
                ></div>
                {selectedOrderId === item.id && (
                  <Spinner
                    color="default"
                    className="inset-0 absolute z-50 opacity-100"
                  />
                )}

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
                    <Trash2Icon
                      className="top-2 right-2 cursor-pointer size-4 text-deepPink"
                      onClick={() => {
                        setSelectedOrderId(item.id);
                        onOpen();
                      }}
                    />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex justify-center mx-auto">
            <NoDataFound />
          </div>
        )}
        
        <OrderSummary totalPrice={10} />
      </section>
    </div>
  );
};

export default OrderLayout;
