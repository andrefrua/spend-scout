import { MenuItemProps } from "@mui/material";

export type NotificationItemProps = MenuItemProps & {
  icon: React.ReactNode;
  title: string;
};
