import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { addToCart, selectCartItems } from "../../../../redux/features/global/cartSlice";

interface FoodCardProps {
  food: any;
  dark: boolean;
  index: number;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, dark, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isItemInCart = cartItems.some((item) => item._id === food._id);
    if (isItemInCart) {
      toast.error(`${food.foodName} is already in your cart!`, {
        duration: 2000,
      });
    } else {
      dispatch(addToCart({ ...food, quantity: 1 }));
      toast.success(`${food.foodName} added to cart!`, {
        duration: 2000,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group h-full"
    >
      <Link
        to={`/food-details/${food._id}`}
        className="block h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        <div className={`h-full flex flex-col ${
          dark ? "bg-gray-900" : "bg-white"
        }`}>
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
            <img
              src={food.foodImage}
              alt={food.foodName}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full"
            >
              Premium
            </motion.div>

            {/* Like Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </motion.button>

            {/* Overlay with Add to Cart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full shadow-xl transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 flex flex-col">
            {/* Category */}
            <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
              dark ? "text-emerald-400" : "text-emerald-600"
            }`}>
              {food.foodCategory}
            </div>

            {/* Title */}
            <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${
              dark ? "text-white" : "text-gray-900"
            }`}>
              {food.foodName}
            </h3>

            {/* Description */}
            <p className={`text-sm mb-4 flex-1 line-clamp-2 ${
              dark ? "text-gray-400" : "text-gray-600"
            }`}>
              {food.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className={`text-xs ml-2 ${
                dark ? "text-gray-400" : "text-gray-500"
              }`}>
                (48 reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200/20">
              <span className={`text-2xl font-bold ${
                dark ? "text-emerald-400" : "text-emerald-600"
              }`}>
                ${food.price}
              </span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  dark
                    ? "bg-gray-800 hover:bg-emerald-900/50"
                    : "bg-gray-100 hover:bg-emerald-100"
                }`}
              >
                <ShoppingCart className={`w-5 h-5 ${
                  dark ? "text-emerald-400" : "text-emerald-600"
                }`} />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FoodCard;
