export type VerticalNavCollapseProps = {
  icon: React.ReactNode;
  name: string;
  children?: React.ReactNode;
  active?: boolean;
  noCollapse?: boolean;
  open?: boolean;
  [key: string]: unknown;
};
