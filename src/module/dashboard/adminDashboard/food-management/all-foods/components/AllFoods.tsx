import React, { useState } from "react";
import { Table } from "antd";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { ConfirmationModal } from "../../../../../../shared/modals/ConfirmationModal";
import { DisLikeIcon, LikeIcon } from "../../../../../../assets/icons";
import RSModal from "../../../../../../shared/modals/RSModal";
import { Button } from "@nextui-org/react";
import ReusableModal from "../../../../../../shared/modals/ReusableModal";
import EditFoodLayout from "../edit-food/EditFoodLayout";
import { Link } from "react-router-dom";

interface foodsTableProps {
  data: any[];
  isFetching: boolean;
  hoveredRow: string | null;
  setHoveredRow: React.Dispatch<React.SetStateAction<string | null>>;
  dropdownType: string;
  setDropdownType: React.Dispatch<React.SetStateAction<string>>;
  onDelete: (userId: string) => void;
  setSelectedBlogId: (status: string | null) => void;
  selectedUserId: string | null;
  onOpen: () => void;
  onOpenChange: () => void;
  isOpen: boolean;
}

const AllFoodsTable: React.FC<foodsTableProps> = ({
  data,
  isFetching,
  hoveredRow,
  setHoveredRow,
  onDelete,
  setSelectedBlogId,
  onOpen,
  onOpenChange,
  isOpen,
}) => {

  const [modalOpen, setModalOpen] = useState(false)
  
  const columns = [
    {
      key: "foodImage",
      title: "image",
      dataIndex: "foodImage",
      render: (image: string) => (
        <img
          src={image}
          alt="Profile"
          className="rounded-full object-cover size-6 md:size-8 lg:size-11"
        />
      ),
    },
    {
      key: "foodName",
      title: "Food Name",
      dataIndex: "foodName",
      render: (foodName: string) => (
        <p className="text-[gray] text-[10px] sm:text-sm md:text-md">{foodName}</p>
      ),
    },
    {
      key: "foodCategory",
      title: "Category",
      dataIndex: "foodCategory",
      render: (category: string) => (
        <p className="text-[gray] text-[10px] sm:text-sm md:text-md">
          {category}
        </p>
      ),
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      render: (category: string) => (
        <p className="text-[gray] text-[10px] sm:text-sm md:text-md">
          {category}
        </p>
      ),
    },
    {
      key: "quantity",
      title: "Quantity",
      dataIndex: "quantity",
      render: (category: string) => (
        <p className="text-[gray] text-[10px] sm:text-sm md:text-md">
          {category}
        </p>
      ),
    },
    {
      key: "made_by",
      title: "Made by",
      dataIndex: "made_by",
      render: (category: string) => (
        <p className="text-[gray] text-[10px] sm:text-sm md:text-md">
          {category}
        </p>
      ),
    },

   
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <div className="flex gap-3">
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
        <div>
          <Link to={`/admin/dashboard/all-foods/edit/food?id=${record._id}`}><Edit2Icon className="size-4 text-[gray]"/></Link>
        </div>
        </div>
      ),
      width: "1%",
    },
  ];

  return (

    <>
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={data}
      pagination={false}
    />

    
    </>
  );
};

export default AllFoodsTable;
