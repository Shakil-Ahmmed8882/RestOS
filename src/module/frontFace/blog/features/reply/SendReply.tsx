import { Button, Textarea } from "@nextui-org/react";
import React from "react";

const SendReply = ({ replyContent, setReplyContent, handleReply, placeholder = "Write your reply..." }) => {
    return (
      <div className="">
        <input
          placeholder={placeholder}
          value={replyContent}
          onChange={(e) =>setReplyContent(e.target.value)}
          className="mb-2 !bg-[white] text-wrap focus-within:outline-[1px] outline-none  p-3 h-20 block w-full rounded-lg"
        />
        <div className="text-end">
        <Button
          size="sm"
          className="border bg-primaryColor !text-[#fff] rounded-full"
          onPress={handleReply}
        >
          Send Reply
        </Button>

        </div>
      </div>
    );
  };
  

  export default SendReply