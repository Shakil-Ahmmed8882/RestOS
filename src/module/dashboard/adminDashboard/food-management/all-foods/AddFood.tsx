// @ts-nocheck

import { Button, Row, Col } from "antd";
import React, { useState } from "react";

import FoodTable from "./features/FoodTable";
import RSModal from "../../../../../shared/modals/RSModal";
import RSForm from "../../../../../shared/forms/RSForm";
import RSInput from "../../../../../shared/forms/RSInput";
import RSSelect from "../../../../../shared/forms/RSSelect";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../../../../../assets/icons/Icons";

const AllFoods = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className={`flex  lg:w-5/6 mx-auto h-11 mt-11  transition500`}>
        <Input
          startContent={<SearchIcon />}
          type={"text"}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search product name"
        />
      </div>

      <div className="max-w-6xl mx-auto mt-8">
        <FoodTable searchValue={searchValue} />
      </div>
    </>
  );
};

export default AllFoods;
