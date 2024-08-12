import { Input } from "antd";
const { TextArea } = Input;

import React from "react";
import { Controller } from "react-hook-form";

const RSTextArea = ({ name, placeholder }) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <TextArea {...field} id={name} placeholder={placeholder} rows={4} />
      )}
    />
  );
};

export default RSTextArea;
