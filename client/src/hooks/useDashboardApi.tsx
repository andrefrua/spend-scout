import { useState, useCallback } from "react";

import { useAuthContext } from "context/AuthProvider";
import { DashboardData } from "generated/models/dashboard";

import useApi from "./useApi";

const useDashboardApi = () => {
  const {
    state: { token }
  } = useAuthContext();
  const { get } = useApi({ token });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(
    async (selectedDate: Date): Promise<DashboardData | null> => {
      try {
        setIsLoading(true);

        const dashboard = await get(
          `/dashboard?selectedDate=${selectedDate.toISOString()}`
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

  return {
    isLoading,
    error,
    fetchDashboard
  };
};

export default useDashboardApi;
