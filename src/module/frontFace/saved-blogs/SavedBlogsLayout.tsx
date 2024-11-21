import React, { useState, useEffect } from "react";

import { toast } from "sonner";
import SavedBlogCard from "./components/SavedBlogCard";
import SavedBlogSpinner from "./components/SavedBlogSpinner";
import SavedBlogSearch from "./components/SavedBlogSearch";
import SavedBlogSkeleton from "./components/SavedBlogSkeleton";
import useDebounce from "../../../🔗Hook/useDebounce";
import { useGetAllSavedBlogsQuery, useUnsaveBlogMutation } from "../../../redux/features/save/save.blog.api";
import { Image } from "@nextui-org/react";
import noDataFound from "../../../assets/img/shared/no-data.gif"
import NoDataFound from "../../../shared/ui/NoDataFound";

const SavedBlogsLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedBlogsData, setSavedBlogsData] = useState<any[]>([]);
  const [unsaveBlogId, setUnsaveBlogId] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [
    unsaveBlog,
    { isLoading: isUnsaveBlogLoading, isSuccess: isUnsaveBlogSuccess },
  ] = useUnsaveBlogMutation();

  const {
    data: fetchedSavedBlogs,
    isLoading,
    isFetching: isBlogFetching,
  } = useGetAllSavedBlogsQuery([{ name: "searchTerm", value: debouncedSearchTerm }]);

  useEffect(() => {
    if (fetchedSavedBlogs?.data) {
      setSavedBlogsData(fetchedSavedBlogs.data);
    }
  }, [fetchedSavedBlogs]);

  const handleUnsaveBlog = async (blogId: string) => {
    setUnsaveBlogId(blogId);
    const updatedBlogs = savedBlogsData.filter((blog) => blog.blog._id !== blogId);
    setSavedBlogsData(updatedBlogs);

    try {
      await unsaveBlog(blogId);
      if (isUnsaveBlogSuccess) {
        toast.success("Successfully unsaved");
      }
    } catch (error) {
      setSavedBlogsData(fetchedSavedBlogs.data);
      toast.error("Failed to unsave");
    } finally {
      setUnsaveBlogId("");
    }
  };

  return (
    <section className={`container mx-auto px-4 py-8 ${isBlogFetching && "opacity-60 animate-pulse"}`}>
      <SavedBlogSearch setSearchTerm={setSearchTerm} />
      {isLoading ? (
        <div className="flex justify-center h-screen">
          <SavedBlogSkeleton />
        </div>
      ) : savedBlogsData.length === 0 ? (
        <NoDataFound/>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-6">
          {savedBlogsData.map((item) => (
            <SavedBlogCard
              key={item._id}
              item={item}
              handleUnsaveBlog={handleUnsaveBlog}
              unsaveBlogId={unsaveBlogId}
              isUnsaveBlogLoading={isUnsaveBlogLoading}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SavedBlogsLayout;
