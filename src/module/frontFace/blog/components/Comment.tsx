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
import { MoreVertical, MessageCircle, Edit2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useDeleteCommentOnBlogMutation,
  useGetAllCommentsOnSingleBlogQuery,
  useUpdateCommentOnBlogMutation,
} from "../../../../redux/features/comment/comment.api";
import CommentSidebarSkeleton from "../features/CommentSkeleton";

interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
}

interface Reply {
  _id: string;
  user: string;
  comment: string;
  createdAt: string;
}

interface CommentData {
  _id: string;
  blog: string;
  user: User;
  comment: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}

const CommentComponent: React.FC<{ comment: CommentData }> = ({ comment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [blogComment, setBlogComment] = useState(comment);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [deleteCommentId, setDeleteCommentId] = useState("");

  // API CALL
  const [updateComment] = useUpdateCommentOnBlogMutation();
  const [deleteComment, { isLoading: commentDeleteLoading }] =
    useDeleteCommentOnBlogMutation();

  const handleReply = () => {
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
      // setIsReplying(false);
      console.log(
        `Reply added to comment - Comment ID: ${blogComment._id}, Reply: ${replyContent}`
      );
    }
  };

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

  // ================= REPLY ==================
  const handleReplyUpdate = (replyId: string, newComment: string) => {
    const updatedReplies = blogComment.replies.map((reply) =>
      reply._id === replyId ? { ...reply, comment: newComment } : reply
    );
    setBlogComment({ ...blogComment, replies: updatedReplies });
    console.log(
      `Reply updated - Comment ID: ${blogComment._id}, Reply ID: ${replyId}, New reply: ${newComment}`
    );
  };

  const handleReplyDelete = (replyId: string) => {
    const updatedReplies = blogComment.replies.filter(
      (reply) => reply._id !== replyId
    );
    setBlogComment({ ...blogComment, replies: updatedReplies });
    console.log(
      `Reply deleted - Comment ID: ${blogComment._id}, Reply ID: ${replyId}`
    );
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
                {commentDeleteLoading && <Spinner className="absolute inset-0 text-[#fff]" color="default" />}
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
                <Textarea
                  placeholder="Write your reply..."
                  value={replyContent}
                  onValueChange={setReplyContent}
                  className="mb-2"
                />
                <Button
                  className="bg-primaryColor text-[white]"
                  onPress={handleReply}
                >
                  Send Reply
                </Button>
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

import commentGif from "../../../../assets/img/shared/comment-gif.gif";
import toast from "react-hot-toast";
export default function CommentSection({ blogId }: { blogId: string }) {
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

const ReplyComponent: React.FC<{
  reply: Reply;
  onDelete: () => void;
  onUpdate: (newComment: string) => void;
}> = ({ reply, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(reply.comment);

  const handleUpdate = () => {
    onUpdate(editedComment);
    setIsEditing(false);
    console.log(
      `Reply updated - ID: ${reply._id}, New comment: ${editedComment}`
    );
  };

  const handleDelete = () => {
    onDelete();
    console.log(`Reply deleted - ID: ${reply._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full shadow-none px-4  mt-5 pb-6 ">
        <CardHeader className="justify-between">
          <div className="flex gap-3">
            <Avatar
              isBordered
              radius="full"
              size="sm"
              className="!size-6 border-none"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5q9GlWCAoQHPpOiDOECuYUeXW9MQP7Ddt-Q&s"
            />
            <div className="flex flex-col items-start justify-center">
              <h5 className="text-small font-semibold leading-none text-default-600">
                User
              </h5>
              <h6 className="text-small tracking-tight text-default-400">
                {new Date(reply.createdAt).toLocaleString()}
              </h6>
            </div>
          </div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Reply actions">
              <DropdownItem
                key="edit"
                startContent={<Edit2 className="h-4 w-4" />}
                onPress={() => setIsEditing(true)}
              >
                Edit reply
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                startContent={<Trash2 className="h-4 w-4" />}
                onPress={handleDelete}
              >
                Delete reply
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  value={editedComment}
                  onValueChange={setEditedComment}
                  className="mb-2"
                />
                <Button size="sm" color="primary" onPress={handleUpdate}>
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
                {reply.comment}
              </motion.p>
            )}
          </AnimatePresence>
        </CardBody>
      </Card>
    </motion.div>
  );
};
