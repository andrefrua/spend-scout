export const formatDateString = (value: string, language: string) => {
  const date = new Date(value);

  return new Intl.DateTimeFormat(language, {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).format(date);
};
