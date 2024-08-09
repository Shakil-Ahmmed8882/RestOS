// src/components/BlogPost.jsx
import React from 'react';
import { useAuth } from '../../../../Utils/useAuthHelper';
import demoBanner from '../../../../assets/img/fishdemo.png';

function BlogPost() {
  const { user } = useAuth();

  return (
    <article className="bg-background rounded-lg shadow-sm overflow-hidden">
      <img
        src={demoBanner}
        alt="Blog post cover image"
        className="w-full h-[200px] md:h-[300px] object-cover"
      />
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
            <img
              className="aspect-square h-full w-full"
              alt="Author avatar"
              src={user?.photoURL || demoBanner}
            />
          </span>
          <div>
            <a className="font-medium hover:underline" href="#">
              John Doe
            </a>
            <p className="text-sm text-muted-foreground">
              Published on <time dateTime="2023-08-09">August 9, 2023</time>
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">
          The Future of Restaurant Food Trends
        </h2>
        <div className="prose prose-lg text-muted-foreground">
          <p className="text-[gray]">
            In the ever-evolving world of culinary arts, the future holds exciting trends and innovations that are set to transform how we enjoy our meals. From the rise of plant-based menus to the increasing popularity of sustainable sourcing, the restaurant industry is undergoing a profound shift.
          </p>
        </div>
      </div>
      <hr className="border-t mx-6 border-[#cfcfcf]" />
      <div className="p-4 md:p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span className="sr-only">Like</span>
          </button>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
            <span className="sr-only">Save</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            <span className="sr-only">Comment</span>
          </button>
          <span className="text-sm text-muted-foreground">12 Comments</span>
        </div>
      </div>
    </article>
  );
}

export default BlogPost;
