// components/FoodItemCard.tsx
import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";

interface FoodItemCardProps {
  label: string;
  image: string;
  onClick?: () => void;
  className?: string; 
}

export const FoodItemCard: React.FC<FoodItemCardProps> = ({ label, image, onClick, className }) => (
  <motion.div className={`flex-shrink-0 ${className}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Card isPressable className="w-40 bg-[white] shadow-md" onClick={onClick}>
      <CardBody className="flex flex-col items-center justify-center p-2">
        <img src={image} alt={label} className="w-20 h-20 object-cover mb-2 rounded-full" />
        <span className="text-sm text-center">{label}</span>
      </CardBody>
    </Card>
  </motion.div>
);
