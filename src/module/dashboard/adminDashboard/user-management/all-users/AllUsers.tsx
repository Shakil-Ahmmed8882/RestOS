import React, { useState } from "react";
import { Pagination } from "antd";
import UsersTable from "./components/UsersTable.tsx";
import { useDisclosure } from "@nextui-org/react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserProfileMutation,
} from "../../../../../redux/features/profile/profile.api";

const AllUsersLayout = () => {
  const [params, setParams] = useState<{ name: string; value: any }[]>([]);
  const [page, setPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null); // Ensure the type is string | null
  const [dropdownType, setDropdownType] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data, isFetching } = useGetAllUsersQuery([
    { name: "page", value: page },
  ]);

  console.log({ hoveredRow });
  const userData = data?.data?.result;
  const meta = data?.data?.meta;
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserProfileMutation();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      onOpenChange();
      setSelectedUserId(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditRole = async (role: string) => {
    try {
      await updateUser({ id: hoveredRow, data: { role } });
      setHoveredRow(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditStatus = async (status: string) => {
    try {
      await updateUser({ id: hoveredRow, data: { status } });
      setHoveredRow(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <UsersTable
        data={userData}
        isFetching={isFetching}
        hoveredRow={hoveredRow}
        setHoveredRow={setHoveredRow} // Pass as it is
        dropdownType={dropdownType}
        setDropdownType={setDropdownType}
        onDelete={handleDeleteUser}
        onEditRole={handleEditRole}
        onEditStatus={handleEditStatus}
        selectedUserId={selectedUserId}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
      <div className="flex justify-start my-3 mr-6">
        <Pagination
          onChange={(value) => setPage(value)}
          total={meta?.total}
          pageSize={meta?.limit}
          current={page}
        />
      </div>
    </>
  );
};

export default AllUsersLayout;
