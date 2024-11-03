

import { Select, SelectItem } from "@nextui-org/select";
import { useFormContext } from "react-hook-form";

import React from "react";
import { IInput } from "../../types";

interface IProps extends IInput {
  options: {
    value: string;
    label: string;
  }[];
}

export default function RSSelect({
  options,
  name,
  label,
  variant = "bordered",
  disabled,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      {...register(name)}
      className="min-w-full sm:min-w-[225px]"
      isDisabled={disabled}
      label={label}
      variant={variant}
    >
      {options.map((option) => (
        <SelectItem key={option.value}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}
