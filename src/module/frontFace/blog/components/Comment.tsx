import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { MoreVertical, MessageCircle, Edit2, Trash2, TableRowsSplit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useDeleteCommentOnBlogMutation,
  useUpdateCommentOnBlogMutation,
} from "../../../../redux/features/comment/comment.api";
import { CommentData, Reply } from "../../../../types/blog.type";
import { useAddReplyToCommentMutation, useDeleteReplyOnCommentMutation, useUpdateReplyOnCommentMutation } from "../../../../redux/features/reply/reply.api";
import SendReply from "../features/reply/SendReply";
import ReplyComponent from "./reply/ReplyComponent";
import toast from "react-hot-toast"

const CommentComponent: React.FC<{ comment: CommentData }> = ({ comment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [blogComment, setBlogComment] = useState(comment);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [deleteCommentId, setDeleteCommentId] = useState("");

  // ================  COMMENT API ================
  const [updateComment] = useUpdateCommentOnBlogMutation();
  const [deleteComment, { isLoading: commentDeleteLoading }] =
    useDeleteCommentOnBlogMutation();

  // ------------  COMMENT HANDLER ------------
  const handleUpdateComment = async () => {
    setBlogComment({ ...blogComment, comment: editedComment });
    setIsEditing(false);
    // console.log(
    //   `Comment updated - ID: ${blogComment._id}, New comment: ${editedComment}`
    // );

    try {
      console.log({ id: blogComment?._id, comment: editedComment });
      await updateComment({ id: blogComment?._id, comment: editedComment });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      // this id is to match with command card
      // to conditionally make it little disable feel when delete is processing
      setDeleteCommentId(blogComment?._id);
      const data = await deleteComment(blogComment._id);

      console.log(data?.data?.success);
      if (data?.data?.success) {
        toast.success("Deleted! ", { position: "bottom-right" });
      }
    } catch (error) {
      toast.error("Please try again! ", { position: "bottom-right" });
    }
  };



  //  ==============  REPLY API ================
  const [addReplyToComment, { data, isSuccess }] =
    useAddReplyToCommentMutation();
  const [updateReplyOnComment] = useUpdateReplyOnCommentMutation();
  const [deleteReplyOnComment] = useDeleteReplyOnCommentMutation();

  //  ------------  REPLY HANDLER ------------
  const handleReplyToComment = async () => {
    if (replyContent.trim()) {
      const newReply: Reply = {
        _id: Date.now().toString(),
        user: "current-user-id",
        comment: replyContent,
        createdAt: new Date().toISOString(),
      };
      setBlogComment({
        ...blogComment,
        replies: [...blogComment.replies, newReply],
      });
      setReplyContent("");
      console.log(
        `Reply added to comment - Comment ID: ${blogComment._id}, Reply: ${replyContent}`
      );
      await addReplyToComment({
        commentId: blogComment._id,
        comment: replyContent,
      });

      console.log(data, isSuccess);
      try {
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  // update
  const handleReplyUpdate = async (replyId: string, newComment: string) => {
    const updatedReplies = blogComment.replies.map((reply) =>
      reply._id === replyId ? { ...reply, comment: newComment } : reply
    );
    setBlogComment({ ...blogComment, replies: updatedReplies });
    console.log(
      `Reply updated - Comment ID: ${blogComment._id}, Reply ID: ${replyId}, New reply: ${newComment}`
    );

    try {
      const updatedReplyData = await updateReplyOnComment({
        commentId: blogComment._id,
        replyId,
        replyText: newComment,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // delete 
  const handleReplyDelete = async (replyId: string) => {
    const updatedReplies = blogComment.replies.filter(
      (reply) => reply._id !== replyId
    );
    setBlogComment({ ...blogComment, replies: updatedReplies });

    try {
      const deletedReply = await deleteReplyOnComment({
        commentId: blogComment._id,
        replyId,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className={`${
          blogComment._id === deleteCommentId ? "bg-[#f5f5f5]" : ""
        } w-full mb-4 !shadow-none `}
      >
        <CardHeader className="justify-between">
          <div className="flex gap-3">
            <Avatar
              isBordered
              radius="full"
              size="sm"
              src={blogComment.user.photo}
            />
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-medium font-semibold leading-none text-default-600">
                {blogComment.user.name}
              </h4>
              <h5 className="text-small tracking-tight text-default-400 mt-2">
                <div className="flex justify-center items-center">
                  {commentDeleteLoading && (
                    <Spinner
                      className="absolute inset-0 text-[#fff]"
                      color="default"
                    />
                  )}
                  {new Date(blogComment.createdAt).toLocaleString()}
                </div>
              </h5>
            </div>
          </div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Comment actions">
              <DropdownItem
                key="edit"
                startContent={<Edit2 className="h-4 w-4" />}
                onPress={() => setIsEditing(true)}
              >
                Edit comment
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                startContent={<Trash2 className="h-4 w-4" />}
                onPress={handleDeleteComment}
              >
                Delete comment
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody className="py-0 text-small text-default-400 shadow-none">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Textarea
                  value={editedComment}
                  onValueChange={setEditedComment}
                  className="mb-2"
                />
                <Button
                  size="sm"
                  disabled
                  className="border bg-[white] hover:bg-primaryColor hover:text-[white] border-primaryColor"
                  onPress={handleUpdateComment}
                >
                  Update
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => setIsEditing(false)}
                  className="ml-2"
                >
                  Cancel
                </Button>
              </motion.div>
            ) : (
              <motion.p
                key="display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {blogComment.comment}
              </motion.p>
            )}
          </AnimatePresence>
        </CardBody>
        <CardFooter className="gap-3">
          <Button
            className="min-w-unit-20"
            color="primary"
            radius="full"
            size="sm"
            variant="light"
            onPress={() => setIsReplying(!isReplying)}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="ml-1">{blogComment.replies.length}</span>
          </Button>
        </CardFooter>
        <AnimatePresence>
          {isReplying && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 bg-default-100">
                <SendReply
                  replyContent={replyContent}
                  setReplyContent={setReplyContent}
                  handleReply={handleReplyToComment}
                />
                <AnimatePresence>
                  {blogComment.replies.map((reply) => (
                    <ReplyComponent
                      key={reply._id}
                      reply={reply}
                      onDelete={() => handleReplyDelete(reply._id)}
                      onUpdate={(newComment) =>
                        handleReplyUpdate(reply._id, newComment)
                      }
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default CommentComponent
