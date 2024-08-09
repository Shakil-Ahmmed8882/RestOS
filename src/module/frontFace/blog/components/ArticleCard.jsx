// @ts-nocheck
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ActionButtons from './ActionButtons';

function ArticleCard({ article, user, onCommentClick }) {
  const navigate = useNavigate();

  return (
    <article className="bg-background rounded-lg shadow-sm overflow-hidden">
      <img
        src={article.banner}
        alt="Blog post cover image"
        width={800}
        height={400}
        style={{ aspectRatio: "800 / 400", objectFit: "cover" }}
        className="w-full h-[200px] md:h-[300px] object-cover cursor-pointer"
        onClick={() => navigate(`/blog/${article.id}`)}
      />
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <img
              className="aspect-square h-full w-full"
              alt="Author avatar"
              src={user?.photoURL || article.banner}
            />
          </span>
          <div>
            <Link className="font-medium hover:underline" to="#">
              {article.author}
            </Link>
            <p className="text-sm text-muted-foreground">
              Published on <time dateTime={article.date}>{article.date}</time>
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 cursor-pointer" onClick={() => navigate(`/article/${article.id}`)}>
          {article.title}
        </h2>
        <div className="prose prose-lg text-muted-foreground">
          <p className='text-[gray]'>
            {/* Article summary or snippet */}
            This is a brief introduction to the article. Read more to dive deeper into the topic.
          </p>
        </div>
      </div>
      <hr className='border-t mx-6 border-[#cfcfcf]' />
      <div className="p-4 md:p-6 flex items-center justify-between">
        <ActionButtons articleId={article.id} />
        <button onClick={onCommentClick} className="inline-flex items-center">
          <span className="sr-only">Comments</span>
          {/* Add your comment icon here */}
          Comments
        </button>
      </div>
    </article>
  );
}

export default ArticleCard;
