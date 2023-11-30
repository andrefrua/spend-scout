import { OutlinedTextFieldProps, StandardTextFieldProps } from "@mui/material";

type CustomInputVariant = "standard" | "outlined";

export type CustomInputBaseProps = {
  variant?: CustomInputVariant;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
};

export type CustomInputProps = Omit<
  OutlinedTextFieldProps | StandardTextFieldProps,
  "variant"
> &
  CustomInputBaseProps & { [key: string]: any };
