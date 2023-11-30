export type CustomAlertColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark";

export type CustomAlertProps = {
  color?: CustomAlertColor;
  dismissible?: boolean;
  children: React.ReactNode;
};
