import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { UserPreferences } from "generated/models/userPreferences";
import { useAuthContext } from "context/AuthProvider";

import useApi from "./useApi";
import useCustomSnackbar from "./useCustomSnackbar";

const useUserPreferencesApi = () => {
  const {
    state: { token }
  } = useAuthContext();
  const { get, put } = useApi({ token });
  const { t } = useTranslation();
  const { showSnackbarSuccess } = useCustomSnackbar();

  const [data, setData] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserPreferences = useCallback(async () => {
    try {
      setIsLoading(true);

      const preferences = await get("/user-preferences");

      setData(preferences);
    } catch (catchError) {
      setError((catchError as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [get]);

  const updateUserPreferences = useCallback(
    async (preferences: UserPreferences) => {
      try {
        setIsLoading(true);

        const updatedPreferences = await put("/user-preferences", preferences);

        setData(updatedPreferences);

        showSnackbarSuccess(
          t("userPreferences.preferencesUpdatedSuccessfully"),
          t("userPreferences.preferences")
        );
        console.info(t("userPreferences.preferencesUpdatedSuccessfully"));

        return updatedPreferences;
      } catch (catchedError) {
        setError((catchedError as Error).message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [put, t, showSnackbarSuccess]
  );

  useEffect(() => {
    fetchUserPreferences();
  }, [fetchUserPreferences]);

  return {
    data,
    isLoading,
    error,
    fetchUserPreferences,
    updateUserPreferences
  };
};

export default useUserPreferencesApi;
