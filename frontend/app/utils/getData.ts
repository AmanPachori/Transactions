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
  startDate?: string,
  endDate?: string,
  amount?: string | number,
  description?: string
) => {
  try {
    const queryParams = new URLSearchParams();
    if (description) queryParams.append("description", description);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    if (amount !== undefined) queryParams.append("amount", amount.toString());

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/transaction/search?${queryParams}`,
      {
        method: "GET",
      }
    );

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

export async function startCron() {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/cron/start`, {
      method: "POST",
    });
  } catch (error) {
    alert(`Error in starting cron job: ${error}`);
  }
}
export async function stopCron() {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/cron/stop`, {
      method: "POST",
    });
  } catch (error) {
    alert(`Error in stoping cron job: ${error}`);
  }
}
