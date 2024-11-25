// generate report api call
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
      alert(errorData.message);

      return;
    }

    const reportData = await response.json();
    return reportData;
  } catch (error) {
    console.error("Error generating report:", error);
  }
};

// Search api call

export const Search = async (
  startDate?: string,
  endDate?: string,
  amount?: string | number,
  userName?: string,
  transactionId?: string,
  description?: string
) => {
  try {
    const queryParams = new URLSearchParams();
    if (description) queryParams.append("description", description);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    if (userName) queryParams.append("userName", userName);
    if (transactionId) queryParams.append("transactionId", transactionId);
    if (amount !== undefined && amount !== 0)
      queryParams.append("amount", amount.toString());

    console.log(queryParams);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/transaction/search?${queryParams}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message);
      return;
    }

    const reportData = await response.json();
    return reportData;
  } catch (error) {
    console.error("Error generating report:", error);
  }
};

// start cron api call

export async function startCron() {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/cron/start`, {
      method: "POST",
    });
  } catch (error) {
    alert(`Error in starting cron job: ${error}`);
  }
}

// stop cron api call

export async function stopCron() {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/cron/stop`, {
      method: "POST",
    });
  } catch (error) {
    alert(`Error in stoping cron job: ${error}`);
  }
}

// Create Txn api call

export const createTransaction = async (
  payload: { type: string; amount: number; description: string },
  token: string | null
): Promise<boolean> => {
  if (token) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/transaction/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error creating transaction:", error);
      return false;
    }
  } else {
    alert("Please Signin to create a new transaction");
    window.location.href = "/signin";
    return false;
  }
};
