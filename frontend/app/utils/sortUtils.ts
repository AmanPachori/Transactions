import { Transaction } from "./type";

export const sortDataUtils = (
  data: Transaction[] | undefined,
  sortField: string,
  sortOrder: string
) => {
  const field = (item: Transaction, field: string): unknown => {
    switch (field) {
      case "amount":
        return item.amount;
      case "datetime":
        return new Date(item.datetime).getTime();
      case "type":
        return item.type.toLowerCase();
      default:
        return "";
    }
  };

  return Array.isArray(data)
    ? data.sort((x, y) => {
        const a = field(x, sortField) as string | number;
        const b = field(y, sortField) as string | number;

        if (a < b) return sortOrder === "asc" ? -1 : 1;
        if (a > b) return sortOrder === "asc" ? 1 : -1;
        return 0;
      })
    : [];
};
