// @ts-nocheck
import React, { useState } from "react";
import { Pagination, Button, Input } from "antd";
import { useAuth } from "../../../../Utils/useAuthHelper";
import Sidebar from "../components/Sidebar";
import ArticleCard from "../components/ArticleCard";
import CommentsSidebar from "../components/CommentsSidebar";
import { articles } from "../components/constant";
import Header from "../features/Header";
import Container from "../../../../shared/layouts/Container";

const commentsData = {
  1: [
    {
      id: 101,
      author: "Alex Lee",
      content: "Great insights on the future of web development!",
      date: "2023-08-10",
    },
    {
      id: 102,
      author: "Sophie Turner",
      content: "Thanks for sharing this!",
      date: "2023-08-11",
    },
  ],
  2: [
    {
      id: 103,
      author: "James Bond",
      content: "Redux Toolkit made my life easier. Great post!",
      date: "2023-08-12",
    },
  ],
  3: [
    {
      id: 104,
      author: "Tony Stark",
      content: "TypeScript is awesome, thanks for the tips!",
      date: "2023-08-13",
    },
  ],
  // Add more comments for other articles as needed
};

const categories = [
  "Development",
  "Programming",
  "Design",
  "Backend",
  "Database",
  "Frontend",
  "DevOps",
];

function BlogLayout() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const pageSize = 5;

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSearch = (term) => setSearchTerm(term);
  const handleCategorySelect = (category) => setSelectedCategory(category);
  const toggleCommentsSidebar = (articleId) => {
    setSelectedArticleId(articleId);
    setShowComments(!showComments);
  };

  const filteredArticles = articles
    .filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (article) => !selectedCategory || article.category === selectedCategory
    );

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section className="py-8 -mt-20 pt-32">
      <Container>
        <Header />
        <div className="grid grid-cols-1 pt-8 md:pt-20 md:grid-cols-[300px_1fr] gap-8 ">
          <div className=" z-40 sticky top-0 bg-[#fafafa]  p-2 pb-0 md:h-screen">
            <Sidebar
              categories={categories}
              onSearch={handleSearch}
              onSelectCategory={handleCategorySelect}
            />
          </div>
          <div className="space-y-8">
            {paginatedArticles.length > 0 ? (
              paginatedArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  user={user}
                  onCommentClick={() => toggleCommentsSidebar(article.id)}
                />
              ))
            ) : (
              <div className="flex h-[0vh] w-full items-center justify-center">
                no data....
              </div>
            )}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredArticles.length}
              onChange={handlePageChange}
            />
          </div>
          <CommentsSidebar
            isVisible={showComments}
            articleId={selectedArticleId}
            comments={commentsData[selectedArticleId] || []}
            onClose={() => setShowComments(false)}
          />
        </div>
      </Container>
    </section>
  );
}

export default BlogLayout;
