export const parseAmount = (amount: string): number | null => {
  const parsedAmount = parseFloat(amount);
  return isNaN(parsedAmount) ? null : parsedAmount;
};
