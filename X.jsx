import { Button, Row } from "antd";
import React from "react";

import { useNavigate } from "react-router-dom";
import RSForm from "./src/Components/form/RSForm";
import RSInput from "./src/Components/form/RSInput";
import RSSelect from "./src/Components/form/RSSelect";

const X = () => {
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
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <RSForm resolver={""} onSubmit={onSubmit} defaultValues={defaultValues}>
        <RSInput type="text" name="foodName" label="Food Name:" />
        <RSInput type="text" name="category" label="Catogry" />
        <RSSelect
          defaultValue={"male"}
          label="Gender"
          name="gender"
          options={genderOptions}
          disabled={undefined}
        />
        <Button htmlType="submit">Login</Button>
      </RSForm>
    </Row>
  );
};

export default X;
