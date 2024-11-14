import React from "react";
import { Table } from "antd";
import { Trash2Icon } from "lucide-react";
import StatusDropdown from "./StatusDropdown";
import { ConfirmationModal } from "../../../../../../shared/modals/ConfirmationModal";
import { DisLikeIcon, LikeIcon } from "../../../../../../assets/icons";

interface blogsTableProps {
  data: any[];
  isFetching: boolean;
  hoveredRow: string | null;
  setHoveredRow: React.Dispatch<React.SetStateAction<string | null>>;
  dropdownType: string;
  setDropdownType: React.Dispatch<React.SetStateAction<string>>;
  onDelete: (userId: string) => void;
  onEditStatus: (status: string) => void;
  setSelectedBlogId: (status: string | null) => void;
  selectedUserId: string | null;
  onOpen: () => void;
  onOpenChange: () => void;
  isOpen: boolean;
}

const BlogsTable: React.FC<blogsTableProps> = ({
  data,
  isFetching,
  hoveredRow,
  setHoveredRow,
  dropdownType,
  setDropdownType,
  onDelete,
  onEditStatus,
  setSelectedBlogId,
  onOpen,
  onOpenChange,
  isOpen,
}) => {
  const columns = [
    {
      key: "image",
      title: "image",
      dataIndex: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="Profile"
          className="rounded-full object-cover size-6 md:size-8 lg:size-11"
        />
      ),
    },
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
      render: (title: string) => (
        <p className="text-[gray] text-[10px] sm:text-sm md:text-md">{title}</p>
      ),
    },
    {
      key: "category",
      title: "Category",
      dataIndex: "category",
      render: (category: string) => (
        <p className="text-[gray] text-[10px] sm:text-sm md:text-md">
          {category}
        </p>
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (status: string, record: any) => (
        <StatusDropdown
          status={status}
          record={record}
          hoveredRow={hoveredRow}
          setHoveredRow={setHoveredRow}
          dropdownType={dropdownType}
          setDropdownType={setDropdownType}
          onEditStatus={onEditStatus}
        />
      ),
    },
    {
      key: "upvotes",
      title: "Upvotes",
      dataIndex: "upvotes",
      render: (upvotes: number) => (
        <span
          className={`  shadow-primaryColor flex items-center gap-1 text-[10px] sm:text-sm md:text-md`}
        >
          <LikeIcon className="text-primaryColor" />
          {upvotes}
        </span>
      ),
    },
    {
      key: "downvotes",
      title: "Downvotes",
      dataIndex: "downvotes",
      render: (downvotes: number) => (
        <span
          className={`text-[10px] sm:text-sm md:text-md shadow-primaryColor flex items-center gap-2`}
        >
          <DisLikeIcon />
          {downvotes}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <div className="flex gap-3">
          <ConfirmationModal
            isOpen={isOpen}
            onConfirm={() => onDelete(record._id)}
            onOpenChange={onOpenChange}
            onCancel={() => onOpenChange()}
            title="Confirm Deletion"
            message="Are you sure you want to delete this item? This action cannot be undone."
          />
          <Trash2Icon
            className="cursor-pointer size-3 md:size-4 text-deepPink"
            onClick={() => {
              onOpen();
              setSelectedBlogId(record._id);
            }}
          />
        </div>
      ),
      width: "1%",
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};

export default BlogsTable;
