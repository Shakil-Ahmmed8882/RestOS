// @ts-nocheck
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ActionButtons from "./ActionButtons";
import { CommentIcon } from "../../../../assets/icons/Icons";

function BlogCard({ blog, user, onCommentClick }) {
  const navigate = useNavigate();

  return (
    <article
      key={blog._id}
      className="bg-background rounded-lg shadow-sm overflow-hidden pb-6"
    >
      <div className="w-full  relative overflow-hidden">
        <img
          src={blog?.image}
          alt="Blog post cover image"
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => navigate(`/blog/${blog._id}`)}
        />
      </div>

      <div className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <img
              className="aspect-square h-full w-full"
              alt="Author avatar"
              src={user?.photoURL || blog?.image}
            />
          </span>
          <div className="mt-4">
            <Link className="font-medium hover:underline" to="#">
              {blog?.author?.name}
            </Link>
            <p className="text-sm description "></p>
          </div>
        </div>
        <h2
          className="text-2xl font-bold my-2 sm:my-0 sm:mb-2  cursor-pointer"
          onClick={() => navigate(`/article/${blog.id}`)}
        >
          {blog?.title}
        </h2>
        <div className="prose prose-lg text-muted-foreground">
          <p className="description">
            This is a brief introduction to the article. Read more to dive
            deeper into the topic.
          </p>
        </div>
      </div>
      <hr className="border-t mx-6 border-[#cfcfcf]" />
      <div className="p-4 md:p-6 flex items-center justify-between">
        <ActionButtons articleId={blog._id} />
        <button onClick={onCommentClick} className="inline-flex items-center">
          <CommentIcon />
        </button>
      </div>
    </article>
  );
}

export default BlogCard;
