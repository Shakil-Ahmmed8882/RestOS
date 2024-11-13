


// TABLE
// import { Table, Pagination } from "antd";
// import React, { useState } from "react";
// import {
//   useDeleteOrderMutation,
//   useGetAllOrdersQuery,
// } from "../../../../redux/features/order/orderApi";
// import { Delete } from "../../../../assets/icons/Icons";
// import { Button } from "@nextui-org/react";
// import { useAuth } from "../../../../Utils/useAuthHelper";
// import ConfirmModal from "../../../../shared/modals/ConfirmModal";
// import { QueryGenerator } from "../../../../Utils";

// const OrderLayout = () => {
//   const { user } = useAuth();
//   const [params, setParams] = useState([]);
//   const [page, setPage] = useState(1);
//   const [selectedOrder, setSelectedOrder] = useState(null);
  
//   const { data: OData, isFetching } = useGetAllOrdersQuery(
//     [
//       { name: "status", value: "pending" },
//       { name: "user", value: "672f74a765cd583c7eab9185" },
//       { name: "page", value: page },
//       { name: "limit", value: 5 },
//       { name: "sort", value: "-createdAt" },
//     ]
//   );


  
//   console.log({OData})

//   const orderedData = OData?.data?.result;
//   const meta = OData?.data?.meta;
//   const foodNamesArray = orderedData?.map((food) => food.foodName);
//   const [deleteOrder] = useDeleteOrderMutation();

//   const handleDelete = (foodId) => {
//     deleteOrder({ id: foodId, email: user?.email });
//     setSelectedOrder(null);
//   };

//   const tableData = orderedData?.map(
//     ({ _id, foodId, food, status, foodImage, price, made_by, email }) => ({
//       key: foodId,
//       foodId,
//       foodName:food.foodName,
//       foodImage:food.foodImage,
//       price,
//       status,
//       made_by,
//       email,
//     })
//   );

//   const columns = [
//     {
//       title: "Food Image",
//       key: "foodImage",
//       dataIndex: "foodImage",
//       render: (image) => (
//         <img src={image} alt="Food" className="rounded-full size-11" />
//       ),
//     },
//     {
//       title: "Food Name",
//       key: "foodName",
//       dataIndex: "foodName",
//       filters: foodNamesArray?.map((foodName) => ({
//         text: foodName,
//         value: foodName,
//       })),
//       onFilter: (value, record) => record.foodName.includes(value),
//     },
//     {
//       title: "Price",
//       key: "price",
//       dataIndex: "price",
//       sorter: (a, b) => a.price - b.price,
//     },
//     {
//       title: "Status",
//       key: "status",
//       dataIndex: "status",
//       sorter: (a, b) => a.price - b.price,
//     },
//     {
//       title: "Made By",
//       key: "made_by",
//       dataIndex: "made_by",
//       filters: [
//         { text: "Chef A", value: "Chef A" },
//         { text: "Chef B", value: "Chef B" },
//       ],
//       onFilter: (value, record) => record.made_by.includes(value),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (record) => (
//         <div className="flex gap-3">
//           <ConfirmModal
//             content={"Are you sure you want to delete this order?"}
//             onOk={() => handleDelete(selectedOrder)}
//           />
//         </div>
//       ),
//       width: "1%",
//     },
//   ];

//   const onChange = (_pagination, filters) => {
//     const queryParams = [];

//     Object.keys(filters).forEach((key) => {
//       if (filters[key]) {
//         filters[key].forEach((value) => {
//           queryParams.push({ name: key, value });
//         });
//       }
//     });

//     setParams(queryParams);
//   };

//   return (
//     <>
//       <Table
//         loading={isFetching}
//         columns={columns}
//         dataSource={tableData}
//         onChange={onChange}
//         showSorterTooltip={{ target: "sorter-icon" }}
//         pagination={false}
//       />
//       <div className="flex justify-start my-3 mr-6">
//         <Pagination
//           onChange={(value) => setPage(value)}
//           total={meta?.total}
//           pageSize={meta?.limit}
//           current={page}
//         />
//       </div>
//     </>
//   );
// };

// export default OrderLayout;
