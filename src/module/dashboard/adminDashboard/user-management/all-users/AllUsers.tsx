import React, { useState } from "react";
import UsersTable from "./components/UsersTable.tsx";
import { useDisclosure } from "@nextui-org/react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserProfileMutation,
} from "../../../../../redux/features/profile/profile.api";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../../shared/ui/PageHeader.tsx";
import useDebounce from "../../../../../🔗Hook/useDebounce.ts";
import CustomPagination from "../../../../../shared/ui/CustomPagination.tsx";

const AllUsersLayout = () => {
  const [params, setParams] = useState<{ name: string; value: any }[]>([]);
  const [page, setPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null); // Ensure the type is string | null
  const [dropdownType, setDropdownType] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isFetching } = useGetAllUsersQuery([
    { name: "limit", value: 5 },
    { name: "page", value: page },
    { name: "searchTerm", value: debouncedSearchTerm },
  ]);

  const userData = data?.data?.result;
  const meta = data?.data?.meta;
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserProfileMutation();

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(`${selectedUserId}`);
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

  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();

  const handleDropdownCategory = (category: string) => {
    if (category === "all") {
      setSearchTerm("");
      navigate("/admin/dashboard/all-users");
      return;
    }

    const reshapedCategory = category.split(" ").join("+");
    navigate(`/admin/dashboard/all-users?category=${reshapedCategory}`);
  };

  return (
    <>
      <PageHeader
        title="User Management Dashboard"
        subtitle="Efficiently manage and track all your orders in one place"
        searchPlaceholder="Search User"
        dropdownOptions={["Option 1", "Option 2", "Option 3", "all"]}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onDropdownChange={(value) => console.log(value)}
        buttonLabel="Choose User"
        buttonProps={{ color: "default" }}
        dropdownProps={{ closeOnSelect: true }}
        inputProps={{ color: "success" }}
      />

      <UsersTable
        data={userData}
        isFetching={isFetching}
        hoveredRow={hoveredRow}
        setHoveredRow={setHoveredRow}
        dropdownType={dropdownType}
        setDropdownType={setDropdownType}
        onDelete={handleDeleteUser}
        onEditRole={handleEditRole}
        onEditStatus={handleEditStatus}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <div className="flex justify-start my-3 mr-6">
      <CustomPagination
          currentPage={page}
          limit={meta?.limit}
          onPageChange={setPage}
          total={meta?.total}
        />
      </div>
    </>
  );
};

export default AllUsersLayout;
