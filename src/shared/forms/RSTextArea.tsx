import { Textarea } from "@nextui-org/input";
import { useFormContext, useWatch } from "react-hook-form";

import React from "react";
import { IInput } from "../../types";

interface IProps extends IInput {
  type?: string;
}

export default function RSTextarea({
  name,
  label,
  variant = "bordered",
  defaultvalue
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({ name });

  return (
    <Textarea
      {...register(name)}
      label={label}
      defaultValue={defaultvalue || ""}
      minRows={6}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      variant={variant}
      value={currentValue || ""}
    />
  );
}
