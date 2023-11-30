export type CustomPaginationVariant = "gradient" | "contained";

export type CustomPaginationColor =
  | "white"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark";

export type CustomPaginationSize = "small" | "medium" | "large";

export type CustomPaginationProps = {
  item?: boolean;
  variant?: CustomPaginationVariant;
  color?: CustomPaginationColor;
  size?: CustomPaginationSize;
  active?: boolean;
  children: React.ReactNode;
  [key: string]: any;
};
