export const parseNumericValue = (value: string): number => {
  // Replace all spaces with empty strings, and replace commas with periods
  const cleanedValue = value.replace(/\s+/g, "").replace(/,/g, ".");

  // Use parseFloat to convert the cleaned string to a number
  const numericValue = parseFloat(cleanedValue);

  // Check if parsing was successful, and return the number or 0 if it failed
  return Number.isNaN(numericValue) ? 0 : numericValue;
};
