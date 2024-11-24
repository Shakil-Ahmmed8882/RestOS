import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  Button,
  Divider,
  Chip,
  Image,
} from "@nextui-org/react";
import { Clock, Users, ChefHat, MapPin, ShoppingBag, Star } from "lucide-react";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSinglefoodQuery } from "../../../redux/features/food/food.api";
import { useCreateOrderMutation } from "../../../redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/features/auth/auth.slice";
import Container from "../../../shared/layouts/Container";
import FoodDetailsSkeleton from "./components/FoodDetailsSkeleton";
import {
  addToCart,
  selectCartItems,
} from "../../../redux/features/global/cartSlice";
import { toast } from "sonner";

export default function FoodDetails() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const { id } = useParams();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const { data, isLoading: isFoodLoading } = useGetSinglefoodQuery(id);
  // @ts-ignore
  const [createOrder, { data: OData, isLoading: OIsloading }] =
    useCreateOrderMutation();

  const goTo = useNavigate();
  const [totalOrders, setTotalOrders] = useState(0);
  // adding order date nad email to food data
  if (!user) {
    return "/sign-in";
  }


  const {
    foodName,
    foodImage,
    foodCategory,
    price,
    food_origin,
    description,
    made_by,
    orders,
  } = data?.data || {};

  const cartItems = useAppSelector(selectCartItems);

  const handleAddToCart = (e, food) => {
    e.preventDefault();
    e.stopPropagation();

    const isItemInCart = cartItems.some((item) => item._id === food._id);
    if (isItemInCart) {
      const id = toast.error(`${food.foodName} is already in your cart!`, {
        duration: 2000,
      });
    } else {
      // If item isn't in cart, add it to the cart
      dispatch(addToCart({ ...food, quantity: 1 }));
    }
  };

  if (isFoodLoading) return <FoodDetailsSkeleton></FoodDetailsSkeleton>;

  return (
    <>
      <Container className="md:px-4 py-8 pt-16 scale-90">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Left Column - Image */}
          <motion.div variants={item}>
            <Card className="w-full h-full sm:h-[500px] md:h-[600px]  shadow-none">
              <CardBody className="p-0 overflow-hidden">
                <Image
                  src={foodImage}
                  alt="Truffle Risotto"
                  className="w-full h-full  object-cover"
                />
              </CardBody>
            </Card>
          </motion.div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <motion.div variants={item}>
              <h1 className="text-4xl font-bold mb-2">{foodName}</h1>
              <div className="flex items-center gap-2 py-1 text-default-500">
                <ChefHat size={20} />
                <span>{made_by}</span>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="flex gap-4 flex-wrap">
                <Chip
                  startContent={<MapPin size={18} />}
                  variant="flat"
                  className="text-primaryColor bg-primaryColor/5"
                >
                  {food_origin}
                </Chip>
                <Chip
                  startContent={<ShoppingBag size={18} />}
                  variant="flat"
                  className="text-primaryColor bg-primaryColor/5"
                >
                  {`${orders} Orders`}
                </Chip>
                <Chip
                  startContent={<Star size={18} />}
                  variant="flat"
                  className="text-primaryColor bg-primaryColor/5"
                >
                  {foodCategory}
                </Chip>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <Card className=" shadow-none">
                <CardBody>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="text-secondaryColor" size={24} />
                      <div>
                        <p className="text-sm text-default-500">
                          Preparation Time
                        </p>
                        <p className="font-semibold">30 mins</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="text-secondaryColor" size={24} />
                      <div>
                        <p className="text-sm text-default-500">Servings</p>
                        <p className="font-semibold">2-4 people</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChefHat className="text-secondaryColor" size={24} />
                      <div>
                        <p className="text-sm text-default-500">Difficulty</p>
                        <p className="font-semibold">Medium</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Divider className="my-4" />
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-default-500 leading-relaxed">{description}</p>
            </motion.div>

            <motion.div variants={item}>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">${price}</span>
                <Button
                  onClick={(e) => handleAddToCart(e, data.data)}
                  size="lg"
                  className="font-semibold  bg-primaryColor text-[white] rounded-full"
                >
                  Add to cart
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </>
  );
}
