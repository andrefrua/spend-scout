type ComplexStatisticsCardColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark";

type ComplexStatisticsCardPercentageColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "dark"
  | "white";

export type ComplexStatisticsCardProps = {
  color?: ComplexStatisticsCardColor;
  title: string;
  count?: string | number;
  percentage?: {
    color: ComplexStatisticsCardPercentageColor;
    amount: string | number;
    label: string;
  };
  icon: React.ReactNode;
};
