import React from "react";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../../../../redux/features/order/orderApi";
import ReusableTable from "../../../../../../shared/tables/RSTable";

const ParentComponent = ({ searchValue }) => {
  const [deleteOrder] = useDeleteOrderMutation();

  // Fetch data function
  const fetchData = (query) => useGetAllOrdersQuery(query);

  // Delete handler
  const handleDelete = (record) => {
    const { foodId } = record;
    deleteOrder({ id: foodId });
  };

  // Edit handler
  const handleEdit = (record) => {
    // Logic to handle edit operation
    const { foodId } = record;
    // Redirect to edit page or open a modal for editing
    console.log(`Edit food with ID: ${foodId}`);
  };

  // Columns configuration
  const columns = [
    {
      title: "Food Image",
      key: "foodImage",
      dataIndex: "foodImage",
      render: (image) => (
        <img src={image} alt="Food" className="rounded-full size-11" />
      ),
    },
    {
      title: "Food Name",
      key: "foodName",
      dataIndex: "foodName",
      filters: [], // Populate filters dynamically
      onFilter: (value, record) => record.foodName.includes(value),
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Made By",
      key: "made_by",
      dataIndex: "made_by",
      filters: [
        { text: "Chef A", value: "Chef A" },
        { text: "Chef B", value: "Chef B" },
      ],
      onFilter: (value, record) => record.made_by.includes(value),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex gap-3">
          {/* <Button onClick={() => handleAction("delete", record)}>Delete</Button> */}
          {/* Other actions can be added here */}
        </div>
      ),
      width: "1%",
    },
  ];


  // Action handlers
  const actions = {
    delete: handleDelete,
    edit: handleEdit,
  };

  return (
    <ReusableTable
      columns={columns}
      fetchData={fetchData}
      actions={actions}
      searchValue={searchValue}
    />
  );
};

export default ParentComponent;
