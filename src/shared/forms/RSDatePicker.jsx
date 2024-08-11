// @ts-nocheck
import { Form, DatePicker } from "antd";
import { useTheme } from "next-themes";
import { Controller } from "react-hook-form";

// const PHInput = ({ type, name, label }: TInputProps) => {
const RSDatePicker = ({ name, label }) => {
  const { theme } = useTheme();

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
          style={{width:"100%"}}
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
