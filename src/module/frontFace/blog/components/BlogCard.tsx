import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogActionButtons from "./BlogActionButtons";
import { CommentIcon } from "../../../../assets/icons/Icons";

function BlogCard({ blog, user, onCommentClick }) {
  const navigate = useNavigate();

  return (
    <article
      key={blog._id}
      className="bg-background rounded-lg shadow-sm overflow-hidden pb-6 flex flex-col md:flex-row items-center"
    >
      {/* Content Section */}
      <div className="w-full md:w-3/4 p-4 md:p-6 flex flex-col">
        {/* Author Info */}
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <img
              className="aspect-square h-full w-full"
              alt="Author avatar"
              src={blog?.author?.user?.photo || blog?.image}
            />
          </span>
          <div>
            <Link className="text-[gray] hover:underline" to="#">
              {blog?.author?.name}
            </Link>
          </div>
        </div>

        {/* Blog Title */}

        <Link to={`${blog._id}`}>
          <h2
            className="text-2xl font-medium  my-2 sm:my-0 sm:mb-2 cursor-pointer"
            onClick={() => navigate(`/article/${blog.id}`)}
          >
            {blog?.title}
          </h2>

          {/* Blog Description */}
          <div className="prose prose-lg text-muted-foreground flex-grow">
            <p className=" text-[gray]">{blog?.description.slice(1, 200)}</p>
          </div>
        </Link>
        {/* Blog Bottom Actions */}
        <div className="flex items-center gap-4">
          <BlogActionButtons blogId={blog._id} blog={blog} />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCommentClick();
            }}
            className="inline-flex"
          >
            <CommentIcon />
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative w-full md:w-1/4 h-44 aspect-[4/3] md:aspect-auto">
        <Link to={`${blog._id}`}>
          <img
            src={blog?.image}
            alt="Blog post cover image"
            className="w-36 h-36 object-cover cursor-pointer"
          />
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;
