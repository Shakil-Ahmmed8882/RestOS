import { Button, Col, Row } from "antd";
import React from "react";
import RSForm from "../../../../../shared/forms/RSForm";
import RSInput from "../../../../../shared/forms/RSInput";
import RSSelect from "../../../../../shared/forms/RSSelect";

const AddFood = () => {
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <section>
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
                //   defaultValue={"category-1"}
                label="Category"
                name="category"
                options={[]}
              />
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <RSInput type="text" name="price" label="Price" key={"price"} />
            </Col>
          </Row>

          {/* Add by & Food origin */}
          <Row gutter={16}>
            <Col span={24} md={{ span: 12 }}>
              <RSInput type="text" name="addBy" label="Add By" key={"addBy"} />
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
            className="w-full py-5 bg-primaryColor text-[white] hover:!bg-primary-color border-none hover:!text-[white] mt-3"
          >
            Login
          </Button>
        </RSForm>
      </Row>
    </section>
  );
};

export default AddFood;
