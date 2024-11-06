import { Button, Textarea } from "@nextui-org/react";
import React from "react";

const SendReply = ({ replyContent, setReplyContent, handleReply, placeholder = "Write your reply..." }) => {
    return (
      <div>
        <Textarea
          placeholder={placeholder}
          value={replyContent}
          onValueChange={setReplyContent}
          className="mb-2"
        />
        <Button
          className="bg-primaryColor text-white"
          onPress={handleReply}
        >
          Send Reply
        </Button>
      </div>
    );
  };
  

  export default SendReply