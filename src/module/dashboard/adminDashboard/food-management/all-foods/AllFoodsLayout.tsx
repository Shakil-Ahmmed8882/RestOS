import React, { useState } from "react";
import { Pagination } from "antd";
import AllFoodsTable from "./components/AllFoods.tsx";
import { useDisclosure } from "@nextui-org/react";

import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../../shared/ui/PageHeader.tsx";
import {
  useDeleteblogMutation,
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
} from "../../../../../redux/features/blog/blog.api.ts";
import { blogCategories, blogStats } from "./data.tsx";
import Statistics from "../../../../../shared/ui/stats/Statistics.tsx";
import { getCategoryFromUrl } from "../../../../frontFace/blog/layout/BlogLayout.tsx";
import useDebounce from "../../../../../🔗Hook/useDebounce.ts";
import { useGetAllFoodsQuery } from "../../../../../redux/features/food/food.api.ts";

const AllFoodsLayout = () => {
  const [page, setPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null); // Ensure the type is string | null
  const [dropdownType, setDropdownType] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedBlogId, setSelectedFoodId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const category = getCategoryFromUrl();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    data,
    isLoading: isBlogDataLoading,
    isFetching,
  } = useGetAllFoodsQuery([
    { name: "searchTerm", value: debouncedSearchTerm },
    ...(category && category !== "All"
      ? [{ name: "category", value: category }]
      : []),
  ]);

  const foodData = data?.data;
  const meta = data?.data?.meta;
  const [deleteFood] = useDeleteblogMutation();
  const [updateFood] = useUpdateBlogMutation();

  const handleDeleteFood = async (userId) => {
    console.log({ selectedBlogId });
    try {
      await deleteFood(`${selectedBlogId}`);
      onOpenChange();
      setSelectedFoodId(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditStatus = async (status: string) => {
    try {
      const res = await updateFood({ id: hoveredRow, data: { status } });

      console.log({ res });
      setHoveredRow(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const navigate = useNavigate();

  const handleDropdownCategory = (category: string) => {
    if (category === "all") {
      setSearchTerm("");
      navigate("/admin/dashboard/all-blog-posts");
      return;
    }

    const reshapedCategory = category.split(" ").join("+");
    navigate(`/admin/dashboard/all-blog-posts?category=${reshapedCategory}`);
  };

  return (
    <div className="mt-11">
      <Statistics stats={blogStats} />
      <PageHeader
        py="py-10"
        searchPlaceholder="Search User"
        dropdownOptions={blogCategories}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onDropdownChange={(value) => handleDropdownCategory(value)}
        buttonLabel="Choose Blogs"
        buttonProps={{ color: "default" }}
        dropdownProps={{ closeOnSelect: true }}
        inputProps={{ color: "success" }}
      />

      <AllFoodsTable
        data={foodData}
        isFetching={isFetching}
        hoveredRow={hoveredRow}
        setHoveredRow={setHoveredRow}
        dropdownType={dropdownType}
        setDropdownType={setDropdownType}
        onDelete={handleDeleteFood}
        onEditStatus={handleEditStatus}
        selectedUserId={selectedBlogId}
        setSelectedBlogId={setSelectedFoodId}
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <div className="flex justify-start my-3 mr-6">
        <Pagination
          onChange={(value) => setPage(value)}
          total={meta?.total}
          pageSize={meta?.limit}
          current={page}
        />
      </div>
    </div>
  );
};

export default AllFoodsLayout;
