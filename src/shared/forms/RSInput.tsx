import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import React from "react";
import { IInput } from "../../types";

interface IProps extends IInput {}

export default function RSInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  className,
  labelColor
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      className={className}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={<span style={{ color: labelColor || "'#000'" }}>{label}</span>}
      required={required}
      size={size}
      type={type}
      variant={variant}
    />
  );
}
