import commentGif from "../../../../assets/img/shared/comment-gif.gif";
import { AnimatePresence } from "framer-motion";
import React from "react";
import CommentSidebarSkeleton from "../features/CommentSkeleton";
import { useGetAllCommentsOnSingleBlogQuery } from "../../../../redux/features/comment/comment.api";
import CommentComponent from "../components/Comment";
export function CommentLayout({ blogId }: { blogId: string }) {
  const { data, isLoading } = useGetAllCommentsOnSingleBlogQuery(blogId);

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {isLoading ? (
          <>
            <CommentSidebarSkeleton />
          </>
        ) : (
          <>
            {data?.data?.length > 0 ? (
              <>
                {data?.data?.map((comment) => (
                  <CommentComponent key={comment._id} comment={comment} />
                ))}
              </>
            ) : (
              <img
                className="-mt-11 h-[55vh] object-cover mx-auto  opacity-30 animate-pulse"
                src={commentGif}
                alt=""
              />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CommentLayout;
