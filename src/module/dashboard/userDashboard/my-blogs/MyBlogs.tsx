import React from "react";
import { useGetAllBlogsQuery } from "../../../../redux/features/blog/blog.api";
import MyBlogHeader from "./components/MyBlogHeader";
import PopularTopics from "./components/PopularTopics";
import MyBlogCard from "./components/MyBlogCard";

export default function MyBlogs() {
  const { data, isLoading: isBlogDataLoading } = useGetAllBlogsQuery([
    { name: "user", value:import.meta.env.VITE_TEST_USER_ID },
  ]);
  const blogData = data?.data || [];

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Hero Banner */}

      <MyBlogHeader />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Articles Section */}
        <MyBlogCard blogData={blogData} />
        <PopularTopics />
      </div>
    </div>
  );
}
