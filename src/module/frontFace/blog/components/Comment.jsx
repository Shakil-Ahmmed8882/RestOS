// @ts-nocheck
import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { LikeOutlined, MessageOutlined, MoreOutlined } from "@ant-design/icons";
import demoBanner from "../../../../assets/img/fishdemo.png";
function Comment({ author, content, date, onLike, onReply }) {
  const menu = (
    <Menu>
      <Menu.Item className="hover:!text-primaryColor" key="1">
        Edit
      </Menu.Item>
      <Menu.Item className="hover:!text-primaryColor" key="2">
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <section>
      <div className="flex items-start space-x-4 p-4 border-b border-gray-200">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-[#e0e0e0]">
            <img
              src={demoBanner}
              className="object-cover h-full w-full"
              alt=""
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            {/* author & date */}
            <div>
              <h4 className="font-bold text-gray-900">{author}</h4>
              <p className="text-xs text-gray-500">{date}</p>
            </div>

            {/* Edit & reply dropdown */}
            <Dropdown
              className="absolute right-4"
              overlay={menu}
              trigger={["click"]}
            >
              <Button shape="circle" icon={<MoreOutlined />} />
            </Dropdown>
          </div>
          <p className="mt-2 text-gray-700">{content}</p>
          <div className="mt-4 flex items-center space-x-4 text-gray-500">
            <button
              onClick={onLike}
              className="flex items-center space-x-1 hover:text-blue-500"
            >
              <LikeOutlined />
              <span>Like</span>
            </button>
            <button
              onClick={onReply}
              className="flex items-center space-x-1 hover:text-blue-500"
            >
              <MessageOutlined />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Comment;
