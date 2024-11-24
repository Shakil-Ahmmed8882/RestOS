// FoodList.jsx
import React, { Suspense } from "react";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import CustomPagination from "../../../../shared/ui/CustomPagination";
import {
  addToCart,
  selectCartItems,
} from "../../../../redux/features/global/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { toast } from "sonner";

const FoodList = ({ foodData, page, setPage, meta }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);


  
  const handleAddToCart = (e, food) => {
    e.preventDefault();
    e.stopPropagation();

    const isItemInCart = cartItems.some((item) => item._id === food._id);
    if (isItemInCart) {
      toast.error(`${food.foodName} is already in your cart!`, {
        duration: 2000,
      });
    } else {
      // If item isn't in cart, add it to the cart
      dispatch(addToCart({ ...food, quantity: 1 }));
    }
  };

  return (
    <div className="col-span-3">
      <div className="grid lg:grid-cols-2 gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          {foodData.map((food) => (
            <Card key={food._id} className="p-4 shadow-sm">
              <Link
                to={`/food-details/${food._id}`}
                className="flex flex-row gap-4"
              >
                <CardBody className="!flex md:flex-row gap-3">
                  <Image
                    alt={food.foodName}
                    className="object-cover rounded-lg"
                    height={140}
                    width={140}
                    src={food.foodImage}
                  />
                  <div className="">
                    <h3 className="font-semibold text-lg">{food.foodName}</h3>
                    <p className="text-sm text-gray-500 text-[gray] mt-1">
                      {food.description}
                    </p>
                    <div className="flex text-[gray] items-center justify-between mt-4">
                      <span className="font-semibold">${food.price}</span>
                      <Button
                        onClick={(e) => handleAddToCart(e, food)} // Stop propagation here
                        size="sm"
                        className="bg-primaryColor/5 text-primaryColor"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Link>
            </Card>
          ))}
        </Suspense>
      </div>
      <CustomPagination
        currentPage={page}
        limit={meta?.limit}
        onPageChange={setPage}
        total={meta?.total}
      />
    </div>
  );
};

export default FoodList;
