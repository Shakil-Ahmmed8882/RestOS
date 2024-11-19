import React from "react";
import { useGetAllBlogsQuery } from "../../../../redux/features/blog/blog.api";
import MyBlogHeader from "./components/MyBlogHeader";
import PopularTopics from "./components/PopularTopics";
import MyBlogCard from "./components/MyBlogCard";
import { useAppSelector } from "../../../../redux/hooks";
import { selectUser } from "../../../../redux/features/auth/auth.slice";
import { Skeleton } from "@nextui-org/react";
import MyBlogSkeleton from "./components/MyBlogSkeleton";

export default function MyBlogs() {
  const user = useAppSelector(selectUser)
  const { data, isLoading: isBlogDataLoading } = useGetAllBlogsQuery([
    { name: "user",  value:user?.userId},
  ]);
  const blogData = data?.data || [];

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Hero Banner */}
   
      <MyBlogHeader/>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Articles Section */}
        {
        isBlogDataLoading && <MyBlogSkeleton/>
      }
        <MyBlogCard blogData={blogData} />
        <PopularTopics />
      </div>
    </div>
  );
}
