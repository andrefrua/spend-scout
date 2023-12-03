import { useState, useCallback } from "react";

import { useAuthContext } from "context/AuthProvider";
import { DashboardData } from "generated/models/dashboard";

import useApi from "./useApi";

const useDashboardApi = () => {
  const {
    state: { token }
  } = useAuthContext();
  const { get, post } = useApi({ token });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(
    async (selectedDate: Date): Promise<DashboardData | null> => {
      try {
        setIsLoading(true);

        const dashboard = await get(
          `/dashboard?selectedDate=${selectedDate.toISOString().split("T")[0]}`
        );

        return dashboard;
      } catch (catchError) {
        setError((catchError as Error).message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [get]
  );

  const fetchTransactionsByCategoryAndDate = useCallback(
    async (selectedDate: Date, categoryId: string) => {
      try {
        setIsLoading(true);

        const transactions = await post(
          "/dashboard/transactionsByCategoryTypeAndDate",
          {
            selectedDate: selectedDate.toISOString().split("T")[0],
            categoryId
          }
        );

        return transactions;
      } catch (catchedError) {
        setError((catchedError as Error).message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [post]
  );

  return {
    isLoading,
    error,
    fetchDashboard,
    fetchTransactionsByCategoryAndDate
  };
};

export default useDashboardApi;
