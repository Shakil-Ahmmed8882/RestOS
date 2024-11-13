import { Button, Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import React from "react";

const OrderSummary = ({ totalPrice }) => {
  return (
    <div className="w-full lg:w-1/3 mt-11 md:mt-0  sticky top-0">
      <Card className="w-full shadow-none md:shadow-md">
        <CardBody>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4 text-[#808080]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>$5.00</span>
            </div>
            <Divider />
            <div className="flex text-[black] justify-between font-bold">
              <span>Total</span>
              <span>${(totalPrice + 5).toFixed(2)}</span>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button className="w-full bg-primaryColor rounded-md text-[white]">
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderSummary;
