export interface YearMonthSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export interface MonthOptions {
  monthNumber: number;
  label: string;
}
