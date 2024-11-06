import React, { useState } from "react";

import { useAuth } from "../../../../Utils/useAuthHelper";
import Sidebar from "../components/Sidebar";
import BlogCard from "../components/BlogCard";
import CommentsSidebar from "../components/CommentsSidebar";
import Header from "../features/Header";
import Container from "../../../../shared/layouts/Container";
import { useGetAllBlogsQuery } from "../../../../redux/features/blog/blog.api";
import useDebounce from "../../../../🔗Hook/useDebounce";
import { useLocation } from "react-router-dom";
import notFoundImg from "../../../../assets/img/shared/4041.png";
import BlogPageSkeleton from "../components/BlogPageSkeleton";

// extract category
export const getCategoryFromUrl = () => {
  const queryParams = new URLSearchParams(location.search);
  return queryParams.get("category");
};

function BlogLayout() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showCommentBlogId, setShowCommenBlogId] = useState(null);

  const pageSize = 5;
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handlePageChange = (page) => setCurrentPage(page);

  const toggleCommentsSidebar = (blogId) => {
    setShowCommenBlogId(blogId);
    setShowComments(!showComments);
  };

  // GET CATEGORY
  const location = useLocation();
  const category = getCategoryFromUrl();

  const { data, isLoading: isBlogDataLoading } = useGetAllBlogsQuery([
    { name: "searchTerm", value: debouncedSearchTerm },
    ...(category && category !== "All"
      ? [{ name: "category", value: category }]
      : []),
  ]);
  const fetchedBlogs = data?.data || []; // Ensure data is defined

  return (
    <section className="py-8 -mt-20 pt-32">
      <Container>
        <Header />
        <div className="grid grid-cols-1 pt-8 md:pt-20 md:grid-cols-[300px_1fr] gap-8 ">
          <div className="z-40 sticky top-0  p-2 pb-0 md:h-screen">
            <Sidebar onSearch={setSearchTerm} />
          </div>
          {isBlogDataLoading ? (
            <>
              <BlogPageSkeleton />
            </>
          ) : (
            <div className="space-y-8">
              {fetchedBlogs.length > 0 ? (
                data?.data.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    blog={blog}
                    user={user}
                    onCommentClick={() => toggleCommentsSidebar(blog._id)}
                  />
                ))
              ) : (
                <div className="flex h-[80vh] animate-pulse opacity-80 w-full items-center justify-center">
                  <img src={notFoundImg} alt="" />
                </div>
              )}
              {/* <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredArticles.length}
              onChange={handlePageChange}
            /> */}
            </div>
          )}
          <CommentsSidebar
            blogId={`${showCommentBlogId}`}
            isVisible={showComments}
            onClose={() => setShowComments(false)}
          />
        </div>
      </Container>
    </section>
  );
}

export default BlogLayout;
