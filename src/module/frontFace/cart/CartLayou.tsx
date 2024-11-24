import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  Button,
  Divider,
  Input,
  Image,
} from "@nextui-org/react";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

import {
  selectCartItems,
  selectCartTotalPrice,
  removeFromCart,
  updateItemQuantity,
} from "../../../redux/features/global/cartSlice";
import type { RootState } from "../../../redux/store";
import React from "react";
import Container from "../../../shared/layouts/Container";

const CartLayout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  
  const shipping = 0; // Free shipping
  console.log({totalPrice})
  console.log({cartItems})

  const handleQuantityChange = (_id: string, newQuantity: number) => {
    dispatch(updateItemQuantity({ _id, quantity: newQuantity }));
  };

  const handleRemoveItem = (_id: string) => {
    dispatch(removeFromCart({ _id }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center">
        <ShoppingBag className="w-16 h-16 text-default-300 mb-4" />
        <h2 className="text-2xl font-semibold text-default-700">
          Your cart is empty
        </h2>
        <p className="text-default-500 mt-2">
          Add some delicious items to your cart
        </p>
      </div>
    );
  }

  return (
    <Container className="min-h-screen  py-8 pt-20">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card className="shadow-none">
            <CardBody>
              <div className="grid grid-cols-12 mb-4 text-sm text-default-500">
                <div className="col-span-6">PRODUCT</div>
                <div className="col-span-2 text-center">PRICE</div>
                <div className="col-span-2 text-center">QUANTITY</div>
                <div className="col-span-2 text-center">TOTAL</div>
              </div>

              <Divider className="my-4" />

              {cartItems.map((item) => (
                <div key={item._id}>
                  <div className="grid grid-cols-12 items-center gap-4">
                    <div className="col-span-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20">
                          <Image
                            src={
                              item.foodImage ||
                              "/placeholder.svg?height=80&width=80"
                            }
                            alt={item.foodName}
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.foodName}</h3>
                          <p className="text-sm text-default-500">
                            {item.foodCategory}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      ${item.price.toFixed(2)}
                    </div>

                    <div className="col-span-2">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                        >
                          <Minus className="w-4 h-4" />
                        </Button>

                        <Input
                          type="number"
                          //   value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item._id,
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-16 text-center"
                          size="sm"
                        />

                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      <div className="flex items-center justify-between">
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Divider className="my-4" />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="shadow-none">
            <CardBody>
              <h2 className="text-xl  text-[gray] font-semibold mb-4">Order Summary</h2>

              <div className="space-y-8">
                <div className="flex justify-between">
                  <span className="text-default-500">Subtotal</span>
                  <span className="font-semibold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-default-500">Shipping</span>
                  <span className="text-primaryColor">Free</span>
                </div>

                <Divider />

                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">
                    ${(totalPrice + shipping).toFixed(2)}
                  </span>
                </div>

                <Button size="lg" className="w-full text-[white] bg-primaryColor rounded-none">
                  Proceed to Checkout
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default CartLayout;
