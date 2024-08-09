// @ts-nocheck

import { Button, Row, Col, Input } from "antd";
import React, { useState } from "react";

import FoodTable from "./features/FoodTable";
import RSModal from "../../../../../shared/modals/RSModal";
import RSForm from "../../../../../shared/forms/RSForm";
import RSInput from "../../../../../shared/forms/RSInput";
import RSSelect from "../../../../../shared/forms/RSSelect";

const AddFood = () => {
  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (err) {}
  };
  const [searchValue, setSearchValue] = useState("");

  // add the category array in the constant file
  // make reusable funciton in utils to create this options with value and label
  const gender = ["male", "female", "other"];
  const genderOptions = gender.map((item) => ({
    value: item,
    label: item,
  }));

  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`flex  lg:w-5/6 mx-auto mt-11 ${
          open
            ? "-translate-x-80 invisible opacity-0"
            : "visible -translate-x-0 opacity-100"
        } transition500`}
      >
        <Input
          type={"text"}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search product name"
        />
        <Button
          onClick={() => setOpen(true)}
          className="bg-primaryColor hover:!bg-primaryColor/90 text-[white] hover:!text-[white] p-6 w-32 flex-1"
        >
          Add product
        </Button>
      </div>

      {/* Modal */}
      <RSModal {...{ open, setOpen }}>
        <Row
          className="block py-16"
          justify="center"
          align="middle"
          style={{ width: "100%", maxWidth: "800px", margin: "auto" }}
        >
          <RSForm resolver={""} onSubmit={onSubmit}>
            {/* Food Name & Image URL */}
            <Row gutter={16}>
              <Col span={24} md={{ span: 12 }}>
                <RSInput
                  type="text"
                  name="foodName"
                  label="Food Name:"
                  key={"foodName"}
                />
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <RSInput
                  type="text"
                  name="imageURL"
                  label="Image URL:"
                  key={"imageURL"}
                />
              </Col>
            </Row>

            {/* Category & Price */}
            <Row gutter={16}>
              <Col span={24} md={{ span: 12 }}>
                <RSSelect
                  defaultValue={"category-1"}
                  label="Category"
                  name="category"
                  options={genderOptions}
                />
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <RSInput type="text" name="price" label="Price" key={"price"} />
              </Col>
            </Row>

            {/* Add by & Food origin */}
            <Row gutter={16}>
              <Col span={24} md={{ span: 12 }}>
                <RSInput
                  type="text"
                  name="addBy"
                  label="Add By"
                  key={"addBy"}
                />
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <RSInput
                  type="text"
                  name="origin"
                  label="Origin"
                  key={"origin"}
                />
              </Col>
            </Row>

            {/* Description & Quantity */}
            <Row gutter={16}>
              <Col span={24} md={{ span: 12 }}>
                <RSInput
                  type="text"
                  name="foodDescription"
                  label="Food Description"
                  key={"foodDescription"}
                />
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <RSInput
                  type="text"
                  name="quantity"
                  label="Quantity"
                  key={"quantity"}
                />
              </Col>
            </Row>

            <Button
              htmlType="submit"
              className="w-full bg-primaryColor text-[white] hover:!bg-primary-color border-none hover:!text-[white] mt-3"
            >
              Login
            </Button>
          </RSForm>
        </Row>
      </RSModal>
      <div className="max-w-6xl mx-auto mt-8">
        <FoodTable searchValue={searchValue} />
      </div>
    </>
  );
};

export default AddFood;
