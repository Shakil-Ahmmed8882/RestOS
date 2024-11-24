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
import React from "react";
import Container from "../../../shared/layouts/Container";
import NoDataFound from "../../../shared/ui/NoDataFound";
import InitialAnimateContainer from "../../shared/animations/InitialAnimateContainer";
import { useNavigate } from "react-router-dom";

const CartLayout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const navigate = useNavigate();

  const shipping = 0; // Free shipping


  const handleQuantityChange = (item: any,quantity:number) => {
    dispatch(
      updateItemQuantity({
        _id: item._id,
        quantity,
        price: item.price,
      })
    );
  };

  const handleRemoveItem = (_id: string) => {
    dispatch(removeFromCart({ _id }));
  };

  

  if (cartItems.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-default-700">
          Your cart is empty
        </h2>
        <NoDataFound className=" !w-1/2" />
      </div>
    );
  }

  return (
    <InitialAnimateContainer>
      <Container className="min-h-screen  py-8 pt-20 ">
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
                            onClick={() => handleQuantityChange(item,item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>

                      

                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            onClick={() =>
                              handleQuantityChange(item, item.quantity + 1 )
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="col-span-2 text-center">
                        <div className="flex items-center justify-between">
                          <span>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
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
          <div className=" sticky top-0 h-screen">
            <Card className="shadow-none bg-[#FAFAFA]">
              <CardBody>
                <div className="space-y-8">
                  <div className="grid grid-cols-4 gap-3">
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="bg-[#f1f1f1] p-3 rounded-lg w-full"
                      >
                        <img
                          className="size-12 rounded-full"
                          src={item.foodImage}
                        />
                      </div>
                    ))}
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

                  <Button
                    onClick={() => navigate("/checkout")}
                    size="lg"
                    className="w-full text-[white] bg-primaryColor rounded-none"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </InitialAnimateContainer>
  );
};

export default CartLayout;
