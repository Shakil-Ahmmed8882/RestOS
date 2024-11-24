import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Button,
  Input,
  Radio,
  RadioGroup,
  Divider,
  Image,
  Spinner,
} from "@nextui-org/react";
import { CreditCard, ShoppingCartIcon as PaypalIcon } from "lucide-react";

import {
  selectCartItems,
  selectCartTotalPrice,
} from "../../../redux/features/global/cartSlice";
import InitialAnimateContainer from "../../shared/animations/InitialAnimateContainer";
import Container from "../../../shared/layouts/Container";
import { useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/features/auth/auth.slice";
import { useCreateOrderMutation } from "../../../redux/features/order/orderApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const tax = totalPrice * 0.1; // 10% tax

  const [createOrder, { isLoading: isCreateOrderLoading }] =
    useCreateOrderMutation();

  const schemaBasedShapedCartItemToStoreInDB = cartItems.map((item) => ({
    food: item._id,
    user: user?.userId,
    foodName: item.foodName,
    quantity: item.quantity,
    price: item.price,
    totalPrice: item.totalPrice,
  }));

  const handleCreateOrder = async () => {
    console.log({ cartItems: schemaBasedShapedCartItemToStoreInDB });
    const toastId = toast.success("Placing order...");
    try {
      const res: any = await createOrder({
        cartItems: schemaBasedShapedCartItemToStoreInDB,
      });

      if (res.success) {
        toast.success("Orders placed successfully", {
          id: toastId,
          duration: 2000,
        });
      }

      navigate("/food");
    } catch (error: any) {
      toast.success("Couldn't place order", { id: toastId, duration: 200 });
    }
  };
  return (
    <InitialAnimateContainer>
      {isCreateOrderLoading && (
        <div className="fixed w-full h-screen bg-[#e9e9e97f] z-50 inset-0 flex justify-center items-center">
          <Spinner color="success" />
        </div>
      )}
      <Container>
        <div className="min-h-screen w-full px-4 py-8">
          <h1 className="text-2xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-3 gap-3 ">
            <Card className="mb-8 shadow-none">
              <CardBody>
                <h2 className="text-lg font-semibold mb-4">Cart Items</h2>
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 mb-4">
                    <Image
                      src={
                        item.foodImage || "/placeholder.svg?height=60&width=60"
                      }
                      alt={item.foodName}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.foodName}</h3>
                      <p className="text-sm text-default-500">
                        {item.foodCategory}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-default-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>

            <Card className="mb-8 shadow-none">
              <CardBody className="gap-6">
                <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
                <RadioGroup
                  value={selectedPayment}
                  onValueChange={setSelectedPayment}
                >
                  <Radio value="credit-card">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Credit/Debit card
                    </div>
                  </Radio>
                </RadioGroup>

                <div className="space-y-4">
                  <Input
                    label="Cardholder Name"
                    placeholder="Enter cardholder name"
                    variant="bordered"
                  />

                  <Input
                    label="Card Number"
                    placeholder="0000 0000 0000 0000"
                    variant="bordered"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      variant="bordered"
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      type="password"
                      maxLength={3}
                      variant="bordered"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="shadow-none">
              <CardBody>
                <h2 className="text-lg font-semibold mb-4">Order Details</h2>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-default-500">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-default-500">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Divider className="my-4" />

                <div className="flex justify-between text-lg mb-6">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">
                    ${(totalPrice + tax).toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={() => handleCreateOrder()}
                  size="lg"
                  className="w-full bg-primaryColor text-[white]"
                >
                  Pay Now
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </InitialAnimateContainer>
  );
}
