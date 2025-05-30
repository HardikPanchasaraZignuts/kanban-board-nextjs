"use client";

import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

interface FormTextFieldProps<T extends FieldValues = FieldValues>
  extends Omit<TextFieldProps, "name"> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  defaultValue?: PathValue<T, Path<T>>; // Allow override
}

const FormTextField = <T extends FieldValues>({
  name,
  label,
  control,
  defaultValue,
  ...rest
}: FormTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={(defaultValue ?? "") as PathValue<T, Path<T>>}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          fullWidth
          error={!!error}
          helperText={error?.message}
          margin="normal"
          {...rest}
          onChange={(e) => {
            const value =
              rest.type === "number" ? +e.target.value : e.target.value;
            field.onChange(value);
          }}
        />
      )}
    />
  );
};

export default FormTextField;
