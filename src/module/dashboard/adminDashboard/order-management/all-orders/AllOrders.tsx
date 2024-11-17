import { Input, useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import useDebounce from "../../../../../🔗Hook/useDebounce";
import { useDeleteOrderMutation, useGetAllOrdersQuery, useUpdateOrderMutation } from "../../../../../redux/features/order/orderApi";

import UsersTable from "./components/OrderTable.tsx";
import { Pagination } from "antd";
import { SearchIcon } from "../../../../../assets/icons/Icons.jsx";
import TabsWrapper from "../../../../../shared/ui/wrapper/TabsWrapper.tsx";
import { tabs } from "./components/data.constants.ts";
import CustomPagination from "../../../../../shared/ui/CustomPagination.tsx";

const AllOrdersLayout = () => {



  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");


  const [page, setPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null); // Ensure the type is string | null
  const [dropdownType, setDropdownType] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isFetching } = useGetAllOrdersQuery([
    { name: "page", value: page },
    { name: "limit", value: 5 },
    { name: "searchTerm", value: debouncedSearchTerm },
    ...(selectedOrderStatus && selectedOrderStatus !=="all"? [{ name: "status", value: selectedOrderStatus }]:[]),


  ]);

  const userData = data?.data?.result;
  const meta = data?.data?.meta;
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();

  const handleDeleteUser = async (orderId) => {

  
    try {
      await deleteOrder(`${orderId}`);
      onOpenChange();
      setSelectedOrderId(null);
    } catch (error) {
      console.error(error.message);
    }
  };


  const handleEditStatus = async (status: string) => {
    try {
      await updateOrder({ id: hoveredRow, data: { status } });
      setHoveredRow(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  



  return (
    <>

      <Input placeholder="Search orders" className="placeholder:text-primaryColor" onChange={(e) => setSearchTerm(e.target.value)} startContent={<SearchIcon className="text-primaryColor"/>}/>

      <TabsWrapper onTabChange={setSelectedOrderStatus} size={"md"} tabs={tabs}/>
      <UsersTable 
        data={userData}
        isFetching={isFetching}
        hoveredRow={hoveredRow}
        setHoveredRow={setHoveredRow}
        dropdownType={dropdownType}
        setDropdownType={setDropdownType}
        onDelete={handleDeleteUser}
        onEditStatus={handleEditStatus}
        selectedOrderId={selectedOrderId}
        setSelectedUserId={setSelectedOrderId}
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <div className="flex justify-start my-3 mr-6">
        {/* <Pagination
          onChange={(value) => setPage(value)}
          total={meta?.total}
          pageSize={meta?.limit}
          current={page}
        /> */}

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

export default AllOrdersLayout;
