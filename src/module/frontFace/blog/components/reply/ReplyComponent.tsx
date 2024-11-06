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
} from "@nextui-org/react";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reply } from "../../../../../types/blog.type";

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
      <Card className="w-full shadow-none p-3  mt-5 pb-6 ">
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
              <h6 className="text-small tracking-tight mt-2 text-default-400">
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
        <CardBody className="px-3 py-0 text-small text-default-600">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  // placeholder="Update reply.."
                  className="mb-4 h-11 text-wrap  block w-full border-none focus-within:outline-none text-[#000]"
                />
                <Button
                  size="sm"
                  className="border-primaryColor border bg-[#fff] rounded-full"
                  onPress={handleUpdate}
                >
                  Updatefdfd
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

export default ReplyComponent;
