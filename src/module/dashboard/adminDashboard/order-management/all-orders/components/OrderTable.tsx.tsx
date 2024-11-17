import React from "react";
import { Table } from "antd";

import { Trash2Icon } from "lucide-react";
import StatusDropdown from "./StatusDropdown";
import { ConfirmationModal } from "../../../../../../shared/modals/ConfirmationModal";

interface UsersTableProps {
  data: any[];
  isFetching: boolean;
  hoveredRow: string | null;
  setHoveredRow: React.Dispatch<React.SetStateAction<string | null>>;
  dropdownType: string;
  setDropdownType: React.Dispatch<React.SetStateAction<string>>;
  onDelete: (userId: string) => void;
  onEditStatus: (status: string) => void;
  setSelectedUserId: (status: string | null) => void;
  selectedOrderId: string | null;
  onOpen: () => void;
  onOpenChange: () => void;
  isOpen: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({
  data,
  isFetching,
  hoveredRow,
  setHoveredRow,
  dropdownType,
  setDropdownType,
  onDelete,
  onEditStatus,
  setSelectedUserId,
  onOpen,
  onOpenChange,
  isOpen,
}) => {



  const columns = [


    {
      title: "Food Image",
      key: "foodImage",
      dataIndex: ["food", "foodImage"], // Accessing foodImage from nested food object
      render: (image: string) => (
        <img
          src={image}
          alt="Food"
          className="rounded-full object-cover size-6 md:size-8 lg:size-11"
        />
      ),
    },
    {
      title: "Food",
      key: "foodName",
      dataIndex: ["food", "foodName"], // Accessing foodName from nested food object
    },
    {
      title: "Customer",
      key: "customerName",
      dataIndex: ["user", "name"], 
    },
    {
      title: "Email",
      key: "customerEmail",
      dataIndex: ["user", "email"], // Accessing user's email from nested user object
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
      key: "totalPrice",
      dataIndex: "totalPrice",
    },
    {
      title: "Status",
      key: "status",
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
            className="cursor-pointer size-4 text-deepPink"
            onClick={() => {
              onOpen();
              setSelectedUserId(record._id);
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

export default UsersTable;
