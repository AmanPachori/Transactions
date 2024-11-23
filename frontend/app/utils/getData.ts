export const GenerateReport = async (
  startDate: string,
  endDate: string,
  amount: number
) => {
  try {
    const queryParams = new URLSearchParams({
      startDate,
      endDate,
      amount: amount.toString(),
    }).toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/transaction/generatereport?${queryParams}`,
      {
        method: "GET",
      }
    );
    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error generating report:", errorData);
      return;
    }

    const reportData = await response.json();
    return reportData;
  } catch (error) {
    console.error("Error generating report:", error);
  }
};
export const Search = async (
  startDate: string,
  endDate: string,
  amount: string | number
) => {
  try {
    const queryParams = new URLSearchParams({
      startDate,
      endDate,
      amount: amount.toString(),
    }).toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/transaction/search?${queryParams}`,
      {
        method: "GET",
      }
    );
    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error generating report:", errorData);
      return;
    }

    const reportData = await response.json();
    return reportData;
  } catch (error) {
    console.error("Error generating report:", error);
  }
};
