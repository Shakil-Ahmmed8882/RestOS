// components/CategoryList.tsx
import React from "react";

import { HorizontalScrollContainer } from "../../../../../shared/components/food/HorizontalScrollContainer";
import { FoodItemCard } from "../../../../../shared/components/food/FoodItemCard";
import { foodListProps } from "../../../../../shared/components/food/type";
import { useNavigate } from "react-router-dom";

export const TrendingFoods: React.FC<foodListProps> = ({
  categories,
  title = "Trending Foods",
  scrollSpeed = 1,
  onItemSelect,
}) => {
  const navigate = useNavigate();
  const onViewAll = () => {
    navigate("/all-trendings");
  };

  return (
    <div className="w-full p-4 bg-[#fff] rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl italic font-bold text-[#a6a6a6]">{title}</h2>
        {onViewAll && (
          <button onClick={onViewAll} className="font-medium text-[#fd38ab]">
            View all
          </button>
        )}
      </div>
      <HorizontalScrollContainer scrollSpeed={scrollSpeed}>
        {categories.map((category) => (
          <FoodItemCard
            key={category.id}
            label={category.name}
            image={category.image}
            onClick={() =>
              onItemSelect && onItemSelect(category.id, category.name)
            }
          />
        ))}
      </HorizontalScrollContainer>
    </div>
  );
};
