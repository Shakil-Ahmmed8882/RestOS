// @ts-nocheck
import { Table } from "antd";
import { useState } from "react";

import React from "react";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../../redux/features/order/orderApi";
import { Delete } from "../../../../assets/icons/Icons";
import { Button } from "@nextui-org/react";
import { useAuth } from "../../../../Utils/useAuthHelper";

const PurchaseList = () => {
  // state and fetch data
  const { user } = useAuth();

  const [params, setParams] = useState(undefined);
  const { data: orderedData, isFetching } = useGetAllOrdersQuery([
    { name: "email", value: user?.email },
    { name: "status", value: "confirmed" },
  ]);
  const foodNamesArray = orderedData?.data?.map((food) => food.foodName);
  const [deleteOrder, { data }] = useDeleteOrderMutation();

  // Delete a order from the table
  const handleDelete = (foodId) => {
    console.log(foodId)
    deleteOrder({ id: foodId, email: user?.email });
  };

  const tableData = orderedData?.data?.map(
    ({ _id, foodId, foodName, status, foodImage, price, made_by, email }) => ({
      key: foodId,
      foodId,
      foodName,
      foodImage,
      price,
      status,
      made_by,
      email,
    })
  );

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
      filters: foodNamesArray?.map((foodName) => ({
        text: foodName,
        value: foodName,
      })),
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
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Made By",
      key: "made_by",
      dataIndex: "made_by",
      filters: [
        {
          text: "Chef A",
          value: "Chef A",
        },
        {
          text: "Chef B",
          value: "Chef B",
        },
      ],
      onFilter: (value, record) => record.made_by.includes(value),
    },
    {
      title: "Action",
      key: "action", // Key for action column
      render: (record) => {
        return (
          <div className="flex gap-3">
            <button onClick={() => handleDelete(record.foodId)}>
              <Delete />
            </button>
          </div>
        );
      },
      width: "1%",
    },
  ];

  const onChange = (_pagination, filters, sorter, extra) => {
    const queryParams = [];

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filters[key].forEach((value) => {
          queryParams.push({ name: key, value });
        });
      }
    });

    // @ts-ignore
    setParams(queryParams);
    console.log(queryParams);
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default PurchaseList;
