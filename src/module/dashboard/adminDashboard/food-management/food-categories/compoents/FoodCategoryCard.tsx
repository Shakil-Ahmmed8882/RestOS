// src/components/FoodCategoryCard.tsx
import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FoodItem } from "../../../../../../types/foodCategory";
import { DeleteIcon, EditIcon, TrashIcon } from "lucide-react";
import EditFoodCategory from "./EditCategory";

interface FoodCategoryCardProps {
  item: FoodItem;
}

const FoodCategoryCard: React.FC<FoodCategoryCardProps> = ({ item }) => {
  const [categoryId, setCategoryId] = useState("");

  

  return (
    <motion.div
      key={item._id}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full shadow-md flex flex-col">
        <CardBody className="p-0 flex-1">
          <div className="relative overflow-hidden ">
            <Image
              src={item.image}
              alt={item.name}
              className=" pb-0 w-full h-full object-cover rounded-t-xl"
            />
            {item.isNew && (
              <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                New
              </span>
            )}
          </div>
        </CardBody>
        <CardFooter className="flex pt-0 justify-between  gap-3 mt-2">
          <h3 className="">{item.name}</h3>

          <div className="flex gap-3 items-center">
            <button onClick={() => setCategoryId(item._id)}>
              <TrashIcon className="size-5 cursor-pointer text-deepPink" />
            </button>

            <EditFoodCategory
              categoryId={categoryId}
              item={item}
              setCategoryId={setCategoryId}
            />
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FoodCategoryCard;
