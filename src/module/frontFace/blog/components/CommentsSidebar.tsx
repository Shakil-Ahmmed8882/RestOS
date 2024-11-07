import React, { useEffect, useRef, useState } from "react";
import { Drawer } from "antd";

import CommentInput from "./CommentInput";
import useDisableBodyScroll from "../../../../🔗Hook/useDisableBodyScroll";
import { useAddCommentOnBlogMutation } from "../../../../redux/features/comment/comment.api";
import { Spinner } from "@nextui-org/react";
import CommentLayout from "../layout/CommentLayout";
import { useAppDispatch } from "../../../../redux/hooks";
import { addLocalComment } from "../../../../redux/features/comment/comment.slice";
import { useAuth } from "../../../../Utils/useAuthHelper";


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



  // State management 
  const dispatch = useAppDispatch()
  const {user} = useAuth()



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
      // Simulating the local comment data
      const commentData = {
        _id: new Date().getTime().toString(),  
        blog: blogId,
        user: {
          _id: "672a2aa19a0d15f44b88473f",
          name: user?.displayName,                 
          email:user?.email,  
          photo:user?.photoURL,  
        },
        comment: inputValue,
        replies: [],  
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(), 
      };

      const remoteCommentData = {
        blog: blogId,
        comment: inputValue,
      };
  
      try {
        // Dispatch the action to add the comment optimistically
        dispatch(addLocalComment(commentData));
  
        // Call the API to add the comment to the backend
        addComment(remoteCommentData);
  
        // Clear the input field after successfully submitting the comment
        setInputValue("");
      } catch (error) {
        console.log("Error while adding comment:", error);
      }
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
        <div className="flex flex-col justify-between max-h-screen scroll-my-0">
          <div className="space-y-4">
            <CommentLayout blogId={blogId}/>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CommentsSidebar;
