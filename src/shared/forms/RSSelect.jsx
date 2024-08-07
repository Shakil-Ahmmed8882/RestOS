import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
import React from "react";

const RSSelect = ({
  label,
  name,
  options,
  defaultValue,
  disabled,
// }: TFormSelectProps): JSX.Element => {
}) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        
        <Form.Item label={label}>
          <Select
            disabled={disabled}
            defaultValue={defaultValue}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default RSSelect;
