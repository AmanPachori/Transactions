export const validateDate = (date: string): Date | null => {
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime()) ? null : parsedDate;
};
