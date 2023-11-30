export type CustomSnackbarColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "dark"
  | "light"
  | "default";

export type CustomSnackbarBaseProps = {
  color?: CustomSnackbarColor;
  icon?: string | React.ReactNode;
  title?: string | React.ReactNode;
  dateTime?: string;
  content: string | React.ReactNode;
  close: () => void;
  bgWhite?: boolean;
};

export type CustomSnackbarProps = CustomSnackbarBaseProps & {
  [key: string]: any;
};
