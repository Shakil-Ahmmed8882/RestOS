import React from "react";
import { Table } from "antd";
import { motion } from "framer-motion";

import { Trash2Icon } from "lucide-react";
import StatusDropdown from "./StatusDropdown";
import RoleDropdown from "./RoleDropdown";
import { ConfirmationModal } from "../../../../../../shared/modals/ConfirmationModal";

interface UsersTableProps {
  data: any[];
  isFetching: boolean;
  hoveredRow: string | null;
  setHoveredRow: React.Dispatch<React.SetStateAction<string | null>>;
  dropdownType: string;
  setDropdownType: React.Dispatch<React.SetStateAction<string>>;
  onDelete: (userId: string) => void;
  onEditRole: (role: string) => void;
  onEditStatus: (status: string) => void;
  setSelectedUserId: (status: string | null) => void;
  selectedUserId: string | null;
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
  onEditRole,
  onEditStatus,
  selectedUserId,
  setSelectedUserId,
  onOpen,
  onOpenChange,
  isOpen,
}) => {
  const columns = [
    {
      key: "photo",
      title: "Photo",
      dataIndex: "photo",
      render: (image: string) => (
        <img
          src={image}
          alt="Profile"
          className="rounded-full object-cover size-6 md:size-8 lg:size-11"
        />
      ),
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
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
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (role: string, record: any) => (
        <RoleDropdown
          role={role}
          record={record}
          hoveredRow={hoveredRow}
          setHoveredRow={setHoveredRow}
          dropdownType={dropdownType}
          setDropdownType={setDropdownType}
          onEditRole={onEditRole}
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
