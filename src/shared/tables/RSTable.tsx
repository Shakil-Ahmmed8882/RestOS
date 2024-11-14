import React, { useState } from "react";
import { Table, Pagination } from "antd";
import { Button } from "@nextui-org/react";
import { Query } from "../../module/dashboard/adminDashboard/food-management/all-foods/utils";

/**
 * Reusable Table component.
 *
 * @param  columns - Column configurations for the table.
 * @param  fetchData - Function to fetch data.
 * @param  actions - Object containing action handlers.
 * @param  searchValue - Search term for filtering.
 */
const ReusableTable = ({ columns, fetchData, actions, searchValue }) => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = fetchData(Query(page, searchValue));

  const tableData = data?.data?.result || [];
  const meta = data?.data?.meta || {};

  // Handle custom actions
  const handleAction = (actionType, record) => {
    if (actions && actions[actionType]) {
      actions[actionType](record);
    }
  };

  // Handle action column
  const actionColumn = {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <div className="flex gap-3">
        {actions && actions.edit && (
          <Button onClick={() => handleAction('edit', record)}>Edit</Button>
        )}
        {actions && actions.delete && (
          <Button onClick={() => handleAction('delete', record)}>Delete</Button>
        )}
      </div>
    ),
    width: "1%",
  };

  const updatedColumns = [...columns, actionColumn];

  
  return (
    <>
      <Table
        loading={isFetching}
        columns={updatedColumns}
        dataSource={tableData}
        onChange={(pagination, filters) => {
          const queryParams = [];

          Object.keys(filters).forEach((key) => {
            if (filters[key]) {
              filters[key].forEach((value) => {
                queryParams.push({ name: key, value });
              });
            }
          });

          // @ts-ignore          setParams(queryParams);
          
        }}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <div className="flex justify-start my-3 mr-6">
        <Pagination
          onChange={(value)=> setPage(value)}
          total={meta?.total}
          pageSize={meta?.limit}
          current={page}
        />
      </div>
    </>
  );
};

export default ReusableTable;