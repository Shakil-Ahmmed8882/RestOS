import commentGif from "../../../../assets/img/shared/comment-gif.gif";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import CommentSidebarSkeleton from "../features/CommentSkeleton";
import { useGetAllCommentsOnSingleBlogQuery } from "../../../../redux/features/comment/comment.api";
import CommentComponent from "../components/Comment";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setComments } from "../../../../redux/features/comment/comment.slice";
export function CommentLayout({ blogId }: { blogId: string }) {
  const { data, isLoading } = useGetAllCommentsOnSingleBlogQuery(blogId);
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.comment);


  
  
  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setComments(data.data)); 
    }
  }, [isLoading, data, dispatch]);




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
                {comments?.comments?.map((comment) => (
                  <CommentComponent blogId={blogId} key={comment._id} comment={comment} />
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
