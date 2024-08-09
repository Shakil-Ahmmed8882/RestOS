import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { LikeOutlined, MessageOutlined, MoreOutlined } from '@ant-design/icons';

function Comment({ author, content, date, onLike, onReply }) {
  const menu = (
    <Menu>
      <Menu.Item key="1">Edit</Menu.Item>
      <Menu.Item key="2">Delete</Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-start space-x-4 p-4 border-b border-gray-200">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div> {/* Placeholder for user avatar */}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold text-gray-900">{author}</h4>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button shape="circle" icon={<MoreOutlined />} />
          </Dropdown>
        </div>
        <p className="mt-2 text-gray-700">{content}</p>
        <div className="mt-4 flex items-center space-x-4 text-gray-500">
          <button onClick={onLike} className="flex items-center space-x-1 hover:text-blue-500">
            <LikeOutlined />
            <span>Like</span>
          </button>
          <button onClick={onReply} className="flex items-center space-x-1 hover:text-blue-500">
            <MessageOutlined />
            <span>Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
