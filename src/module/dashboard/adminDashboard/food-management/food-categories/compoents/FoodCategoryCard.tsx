// src/components/FoodCategoryCard.tsx
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { FoodItem } from "../../../../../../types/foodCategory";
import {
  AwardIcon,
  DeleteIcon,
  EditIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import EditFoodCategory from "./EditCategory";
import { ConfirmationModal } from "../../../../../../shared/modals/ConfirmationModal";
import { useDeleteFoodCategoryMutation } from "../../../../../../redux/features/food-category/foodCategory.api";

interface FoodCategoryCardProps {
  item: FoodItem;
}

const FoodCategoryCard: React.FC<FoodCategoryCardProps> = ({ item }) => {
  const [categoryId, setCategoryId] = useState("");
  const [deleteCategory] = useDeleteFoodCategoryMutation();

  const onFoodCategoryDelete = async (id: string) => {
    try {
      await deleteCategory(id);
    } catch (error) {
      console.log(error);
    }
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <motion.div
      key={item._id}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full group shadow-md group flex flex-col rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
        <CardBody className="p-0 flex-1 relative">
          <div className="relative overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              className="size-28 object-cover rounded-full"
            />
            {item.isNew && (
              <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                New
              </span>
            )}
          </div>
        </CardBody>

        <CardFooter className="flex justify-between items-center p-4 bg-white rounded-b-lg shadow-inner">
          <div>
            <h3 className="lg:text-xl  text-[#1a1a1a]">{item.name}</h3>
            <p className="text-lg text-[gray]">
              {item!.description.slice(0, 16)}..
            </p>
          </div>

          <div className="flex gap-4 items-center absolute right-4 bottom-11 invisible group-hover:visible group-hover:opacity-100 opacity-0 transition-all duration-300 translate-y-5 group-hover:translate-y-0">
            <ConfirmationModal
              isOpen={isOpen}
              onConfirm={() => onFoodCategoryDelete(item._id)}
              onOpenChange={onOpenChange}
              onCancel={() => onOpenChange()}
              title="Confirm Deletion"
              message="Are you sure you want to delete this item? This action cannot be undone."
            />
            <Trash2Icon
              className="cursor-pointer text-[gray] size-5 hover:text-deepPink transition duration-200"
              onClick={() => {
                onOpen();
                setCategoryId(item._id);
              }}
            />

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
