import React, { useRef } from "react";
import { Button } from "antd";
import { Avatar } from "@nextui-org/react";
import { useAuth } from "../../../../Utils/useAuthHelper";

interface CommentInputProps {
  inputValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onComment: () => void;
  isCommentingDisabled: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const CommentInput: React.FC<CommentInputProps> = ({
  inputValue,
  onChange,
  onComment,
  isCommentingDisabled,
  inputRef,
}) => {
  const { user } = useAuth();

  return (
    <div className="p-4 pb-5">
      {/* Avatar and username always visible */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar src={`${user?.photoURL}`} />
        <p>{user?.displayName}</p>
      </div>

      {/* Input field always visible and auto-focused */}
      <input
        ref={inputRef} // Attach the ref to the input field
        type="text"
        placeholder="Add your comment.."
        value={inputValue}
        onChange={onChange}
        className="border-none outline-none ring-0 block p-3 w-full mb-4"
      />

      {/* Cancel and Comment buttons always visible */}
      <div className="flex justify-end gap-3">
        <Button
          className={`${
            !inputValue.trim()
              ? "disabled:opacity-40 disabled:text-[white]"
              : "disabled:opacity-100"
          }  rounded-full !bg-primaryColor text-[#fff]`}
          onClick={onComment}
          disabled={isCommentingDisabled}
        >
          Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentInput;
