// @ts-nocheck
import React, { useRef } from "react";
import { Drawer, Input } from "antd";
import Comment from "./Comment"; // Import the Comment component
import useClickOutside from "../../../../🔗Hook/useClickOutside";

function CommentsSidebar({ isVisible, comments, onClose, articleId }) {
  const handleLike = (commentId) => {
    console.log("Liked comment:", commentId);
  };

  const handleReply = (commentId) => {
    console.log("Replying to comment:", commentId);
  };
  const commentRef = useRef();
  useClickOutside(commentRef, onclose);

  return (
    <div ref={commentRef}>
      <Drawer
        title="Comments"
        placement="right"
        onClose={onClose}
        visible={isVisible}
        width={400}
      >
        <div className=" flex flex-col justify-between h-screen ">
        <div className="space-y-4">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              author={comment.author}
              content={comment.content}
              date={comment.date}
              onLike={() => handleLike(comment.id)}
              onReply={() => handleReply(comment.id)}
            />
          ))}
        </div>
        <div className="flex justify-center ">
          <Input type="text" className="mt-auto rounded-full absolute bg-[white]  w-[90%] mx-auto bottom-3 p-4 focus-within:border-primaryColor hover:border-primaryColor" placeholder="Comment" />
        </div>


        </div>
      </Drawer>
    </div>
  );
}

export default CommentsSidebar;
