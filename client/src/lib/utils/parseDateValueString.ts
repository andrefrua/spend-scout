export const parseDateValueString = (value: string): string => {
  // TODO: We need some validations in case the date is actually wrong
  // Split the date string by '/'
  const dateParts = value.split("/");

  // Reformat the date string to 'YYYY-MM-DD'
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
};
