// src/components/FoodCategoryList.tsx
import React from 'react';
import { motion } from 'framer-motion';
import FoodCategoryCard from './FoodCategoryCard';
import { FoodItem } from '../../../../../../types/foodCategory';
import CategorySkeleton from './CategorySkeleton';
import NotFound from '../../../blog-management/blog-analytics/components/NotFound';

interface FoodCategoryListProps {
  data?: FoodItem[];
  isLoading: boolean;
  isFetching: boolean;
}

const FoodCategoryList: React.FC<FoodCategoryListProps> = ({ data, isLoading, isFetching }) => {
  if (isLoading || isFetching) {
    return <CategorySkeleton />;
  }

  if (!data?.length) {
    return <NotFound />;
  }

  return (
    <motion.div layout className="grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <FoodCategoryCard key={item._id} item={item} />
      ))}
    </motion.div>
  );
};

export default FoodCategoryList;
