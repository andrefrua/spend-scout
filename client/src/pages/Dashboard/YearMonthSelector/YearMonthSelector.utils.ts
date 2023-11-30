import { MonthOptions } from "./YearMonthSelector.models";

export const getLastXYears = (numberOfYear: number) => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: numberOfYear }, (_, i) => currentYear - i);
};

export const getMonthOptions = (language: string): MonthOptions[] => {
  const formatter = new Intl.DateTimeFormat(language, {
    month: "long"
  });

  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2022, i, 1);
    return {
      monthNumber: i + 1,
      label: formatter.format(date)
    };
  });
};
