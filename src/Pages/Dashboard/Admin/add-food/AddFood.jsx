import { Button, Row, Col } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import RSForm from "../../../../Components/form/RSForm";
import RSInput from "../../../../Components/form/RSInput";
import RSSelect from "../../../../Components/form/RSSelect";

const AddFood = () => {
  const defaultValues = {
    foodName: "Birany",
    category: "category-a",
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (err) {}
  };

  const gender = ["male", "female", "other"];
  const genderOptions = gender.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <Row className="block py-16" justify="center" align="middle" style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
      <RSForm resolver={""} onSubmit={onSubmit} defaultValues={defaultValues}>
        {/* Food Name & Image URL */}
        <Row gutter={16}>
          <Col span={24} md={{ span: 12 }}>
            <RSInput type="text" name="foodName" label="Food Name:" key={"foodName"} />
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <RSInput type="text" name="imageURL" label="Image URL:" key={"imageURL"} />
          </Col>
        </Row>

        {/* Category & Price */}
        <Row gutter={16}>
          <Col span={24} md={{ span: 12 }}>
            <RSSelect defaultValue={"category-1"} label="Category" name="category" options={genderOptions} />
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
            <RSInput type="text" name="origin" label="Origin" key={"origin"} />
          </Col>
        </Row>

        {/* Description & Quantity */}
        <Row gutter={16}>
          <Col span={24} md={{ span: 12 }}>
            <RSInput type="text" name="foodDescription" label="Food Description" key={"foodDescription"} />
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <RSInput type="text" name="quantity" label="Quantity" key={"quantity"} />
          </Col>
        </Row>

        <Button htmlType="submit" className="w-full bg-primaryColor text-[white] hover:!bg-primary-color border-none hover:!text-[white] mt-3">Login</Button>
      </RSForm>
    </Row>
  );
};

export default AddFood;