import { useTheme } from "next-themes";
import React, { useState, useEffect, Suspense } from "react";

import { SearchBar, FloodingReview, FoodPageSkeleton } from "./data/index";
import { useGetAllFoodsQuery } from "../../../redux/features/food/food.api";
import { Filter } from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Image,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import Container from "../../../shared/layouts/Container";
import NoDataFound from "../../../shared/ui/NoDataFound";
import CustomPagination from "../../../shared/ui/CustomPagination";
import { Link, useNavigate } from "react-router-dom";
import { getCategoryFromUrl } from "../blog/layout/BlogLayout";
import FoodFilters from "./features/FoodFilters";
import FoodList from "./features/FoodList";

const FoodsLayout = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const category = getCategoryFromUrl();
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState("0-100");
  const [isShowFilter, setIsShowFilter] = useState(false);

  const { data: foodData, isLoading } = useGetAllFoodsQuery([
    { name: "searchTerm", value: searchTerm },
    { name: "page", value: page },
    { name: "limit", value: 8 },
    ...(category && category !== "All"
      ? [{ name: "foodCategory", value: category }]
      : []),
    { name: "minPrice", value: selectedRange.split("-")[0] },
    { name: "maxPrice", value: selectedRange.split("-")[1] },
  ]);

  const [searchResult, setSearchResult] = useState(foodData?.data || []);
  const [isFieldEmpty, setIsFieldEmpty] = useState(true);

  useEffect(() => {
    if (foodData?.data) setSearchResult(foodData.data);
  }, [foodData?.data]);

  const handleCategoryChange = (category) => {
    if (category === "All") {
      setSearchTerm("");
      setSelectedRange("0-100");
      navigate("/food");
      setIsShowFilter(false);
    } else {
      setIsShowFilter(false);
      navigate(`/food?category=${category.replace(" ", "+")}`);
    }
  };

  return (
    <div className="pb-9">
      <div
        className={`min-h-[70vh] flex justify-center items-center relative ${
          theme === "dark" ? "bg-dark-food" : "bg-light-food"
        }`}
      >
        <SearchBar
          setSearchTerm={setSearchTerm}
          isFieldEmpty={isFieldEmpty}
          theme={theme}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          foodData={foodData?.data}
          setIsFieldEmpty={setIsFieldEmpty}
        />
        <FloodingReview />
      </div>

      {isLoading ? (
        <FoodPageSkeleton />
      ) : (
        <Container>
          <div className="flex relative gap-3 pt-6">
            <Filter
              onClick={() => setIsShowFilter(!isShowFilter)}
              className="w-5 cursor-pointer h-5 z-[999] absolute md:hidden top-3 left-5 "
            />

            <FoodFilters
              setIsShowFilter={setIsShowFilter}
              isShowFilter={isShowFilter}
              handleCategoryChange={handleCategoryChange}
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
            />

            {foodData?.data?.length > 0 ? (
              <FoodList
                foodData={foodData?.data}
                page={page}
                setPage={setPage}
                meta={foodData?.meta}
              />
            ) : (
              <NoDataFound />
            )}
          </div>
        </Container>
      )}
    </div>
  );
};

export default FoodsLayout;
