import React from "react";
import { getCategoryFromUrl } from "../../../../../Utils/getCategoryFromUrl";
import { useGetAllBlogsQuery } from "../../../../../redux/features/blog/blog.api";
import useDebounce from "../../../../../🔗Hook/useDebounce";
import Statsitics from "./Statsitics";
const AllBlogs = () => {
  const category = getCategoryFromUrl();
  const debouncedSearchTerm = useDebounce("give searchterm", 500);

  const { data, isLoading: isBlogDataLoading } = useGetAllBlogsQuery([
    // { name: "searchTerm", value: debouncedSearchTerm },
    ...(category && category !== "All"
      ? [{ name: "category", value: category }]
      : []),
  ]);


  
  console.log(category)


  return (
    <section>
      <Statsitics/>
    </section>
  );
};

export default AllBlogs;