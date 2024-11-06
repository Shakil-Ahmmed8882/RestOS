import React, { useEffect, useRef, useState } from "react";
import { Drawer } from "antd";
import CommentSection from "./Comment";
import CommentInput from "./CommentInput";
import useDisableBodyScroll from "../../../../🔗Hook/useDisableBodyScroll";
import { useAddCommentOnBlogMutation } from "../../../../redux/features/comment/comment.api";
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
  // API call
  const [addComment, { data, isLoading:createCommentLoading }] = useAddCommentOnBlogMutation();

  // To store the comment text
  const [inputValue, setInputValue] = useState("");
  // Create a reference for the input field
  const inputRef = useRef<HTMLInputElement>(null);
  useDisableBodyScroll(isVisible);

  // Focus the input field when the drawer is visible
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          console.log("Input focused");
        }
      }, 100);
    }
  }, [isVisible]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };



  // ADD COMMENTS 
  const handleComment = () => {
    if (inputValue.trim()) {
      const commentData = {
        blog: blogId,
        comment: inputValue,
      };
      try {
        addComment(commentData);
      } catch (error) {
        console.log(error);
      }

      // Clear the input after commenting
      setInputValue("");
    }
  };

  const handleCancel = () => {
    setInputValue(""); // Clear the input on cancel
  };

  return (
    <div >
      <Drawer
        title={` Comments `}
        className={`${createCommentLoading?"!bg-[#fafafa]":""}`}
        placement="right"
        onClose={onClose}
        open={isVisible}
        width={400}
      >
        <div className="mb-8 bg-[#fff]">
          <CommentInput
            inputValue={inputValue}
            onChange={handleInputChange}
            onCancel={handleCancel}
            onComment={handleComment}
            isCommentingDisabled={!inputValue.trim()}
            inputRef={inputRef}
          />
        </div>
        {
          createCommentLoading && <Spinner className="mx-auto mb-3 -mt-2 flex" color="default"/>
        }
        <div className="flex flex-col justify-between max-h-screen scroll-my-0">
          <div className="space-y-4">
            <CommentSection blogId={blogId}/>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CommentsSidebar;
