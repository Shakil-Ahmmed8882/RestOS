// @ts-nocheck

import { Form, DatePicker } from "antd";
import { Controller } from "react-hook-form";

// const PHInput = ({ type, name, label }: TInputProps) => {
const RSDatePicker = ({ name, label }) => {

  const onChange =  (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <Form.Item
      label={label}
      style={{
        marginBottom: "20px",
      }}
    >
      <Controller
        name={name}
        render={({ field }) => (
          <DatePicker
            onChange={onChange}
            picker=""
            style={{ width: "100%" }}
            size="large"
            {...field}
            id={name}
          />
        )}
      />
    </Form.Item>
  );
};

export default RSDatePicker;
