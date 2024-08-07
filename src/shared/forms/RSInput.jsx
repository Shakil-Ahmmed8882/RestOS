// @ts-nocheck
import { Form, Input } from "antd";
import { useTheme } from "next-themes";
import { Controller } from "react-hook-form";

// type TInputProps = {
//   type: string;
//   name: string;
//   label?: string;
// };

// const PHInput = ({ type, name, label }: TInputProps) => {
const RSInput = ({ type, name, label, className }) => {
  const {theme} = useTheme()
  return (
    <Form.Item  label={label} style={{
       marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => <Input className={`
          ${className}
          ${theme === "dark" ? "bg-[#3c3c3c20] border-none  text-[white]" : ""}
          text-xl
          
          `} {...field} type={type} id={name} />}
      />
    </Form.Item>
  );
};

export default RSInput;
