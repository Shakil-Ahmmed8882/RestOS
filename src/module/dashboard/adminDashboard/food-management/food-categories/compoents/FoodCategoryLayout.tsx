// src/pages/FoodCategory.tsx
import React, { useEffect, useState } from "react";
import { Input, ScrollShadow } from "@nextui-org/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "../../../../../../🔗Hook/useDebounce";
import { useGetAllFoodsCategoriesQuery } from "../../../../../../redux/features/food-category/foodCategory.api";
import { FoodsCategoryResponse } from "../../../../../../types/foodCategory";
import { SearchIcon } from "../../../../../../assets/icons/Icons";
import AddCategory from "../AddCategory";
import CategoryButton from "./CategoryButton";
import FoodCategoryList from "./FoodCategoryList";
import { categories } from "./data";
import CustomPagination from "../../../../../../shared/ui/CustomPagination";

const FoodCategoryLayout: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetAllFoodsCategoriesQuery<
    FoodsCategoryResponse & any
  >([
    {
      name: "searchTerm",
      value:
        debouncedSearchTerm ||
        (selectedCategory === "all" ? "" : selectedCategory),
    },
    {
      name: "page",
      value: page,
    },
    { name: "limit", value: 5 },
  ]);

  const meta = data?.meta;

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    navigate(`?category=${category}`);
  };

  return (
    <div className="w-full bg-white mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
         

          <div className="md:flex items-center justify-between">
            <Input
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search.."
              className="mt-5 md:w-2/3"
              startContent={<SearchIcon />}
            />
            <div className="text-right">
              <AddCategory />
            </div>
          </div>
        </div>

        <ScrollShadow className="w-full" orientation="horizontal">
          <div className="flex flex-wrap gap-4 w-full overflow-x-auto pb-4">
            {categories?.map((category) => {
              const Icon = category.icon;
              return (
                <CategoryButton
                  key={category.id}
                  id={category.id}
                  label={category.label}
                  icon={Icon}
                  isActive={selectedCategory === category.id}
                  onClick={() => handleCategoryClick(category.id)}
                />
              );
            })}
          </div>
        </ScrollShadow>

        <div className="flex flex-col gap-4">
          <FoodCategoryList
            data={data?.data}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </div>
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

export default FoodCategoryLayout;
