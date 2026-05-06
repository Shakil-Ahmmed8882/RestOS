import React, { useEffect, useRef, useState } from "react";
import { Drawer } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import CommentInput from "./CommentInput";
import useDisableBodyScroll from "../../../../Hook/useDisableBodyScroll";
import {
  useAddCommentOnBlogMutation,
  useGetAllCommentsOnSingleBlogQuery,
} from "../../../../redux/features/comment/comment.api";
import CommentComponent from "./Comment";
import { useAuth } from "../../../../Utils/useAuthHelper";
import { Spinner } from "@nextui-org/react";

interface CommentsSidebarProps {
  isVisible: boolean;
  onClose: () => void;
  blogId: string;
}

const CommentsSidebar: React.FC<CommentsSidebarProps> = ({
  isVisible,
  blogId,
  onClose,
}) => {
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useDisableBodyScroll(isVisible);

  const [addComment, { isLoading: submitting }] = useAddCommentOnBlogMutation();

  // Load comments directly from RTK Query cache — no Redux slice needed
  const { data: comments = [], isLoading: commentsLoading } =
    useGetAllCommentsOnSingleBlogQuery(blogId, { skip: !blogId || blogId === "null" });

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isVisible]);

  const handleComment = async () => {
    if (!inputValue.trim()) return;

    // Build the optimistic entry shown instantly in the UI (pending state)
    const optimisticEntry = {
      _id: `optimistic-${Date.now()}`,
      _pending: true,
      blog: blogId,
      user: {
        _id: "local",
        name: user?.displayName ?? "You",
        email: user?.email ?? "",
        photo: user?.photoURL ?? "",
      },
      comment: inputValue.trim(),
      replies: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const remotePayload = {
      blog: blogId,
      comment: inputValue.trim(),
      _optimisticEntry: optimisticEntry,
    };

    setInputValue("");
    try {
      await addComment(remotePayload).unwrap();
    } catch {
      // RTK will undo the optimistic patch automatically
    }
  };

  return (
    <Drawer
      title="Comments"
      placement="right"
      onClose={onClose}
      open={isVisible}
      width={420}
      bodyStyle={{ padding: 0, display: "flex", flexDirection: "column" }}
    >
      {/* Input at top */}
      <div className="border-b border-gray-100 bg-white">
        <CommentInput
          inputValue={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onCancel={() => setInputValue("")}
          onComment={handleComment}
          isCommentingDisabled={!inputValue.trim() || submitting}
          inputRef={inputRef}
        />
        {submitting && (
          <div className="flex items-center gap-2 px-4 pb-3 text-xs text-gray-400">
            <Spinner size="sm" color="success" />
            Posting…
          </div>
        )}
      </div>

      {/* Comments list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {commentsLoading ? (
          <div className="flex justify-center py-10">
            <Spinner color="success" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No comments yet. Be the first!
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {comments.map((comment: any) => (
              <motion.div
                key={comment._id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: comment._pending ? 0.6 : 1,
                  y: 0,
                  // pending comments get a subtle pulsing left border
                  borderLeftWidth: comment._pending ? 3 : 0,
                  borderLeftColor: "#10b981",
                }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className={`${comment._pending ? "border-l-2 border-emerald-400 pl-2 rounded-l animate-pulse" : ""}`}
              >
                <CommentComponent
                  blogId={blogId}
                  comment={comment}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </Drawer>
  );
};

export default CommentsSidebar;
