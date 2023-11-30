import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { API_URL } from "config";

export interface useApiProps {
  token?: string | null;
}

const useApi = ({ token }: useApiProps = { token: undefined }) => {
  const { i18n } = useTranslation();

  const headers = useMemo(() => {
    const localHeaders: {
      Authorization?: string;
      "Accept-Language": string;
    } = {
      "Accept-Language": i18n.language
    };

    if (token) {
      localHeaders.Authorization = `Bearer ${token}`;
    }

    return localHeaders;
  }, [token, i18n.language]);

  const get = useCallback(
    async (endpoint: string) => {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "GET",
        headers
      });

      if (!response.ok) {
        const responseError = await response.text();
        throw new Error(responseError);
      }

      return response.json();
    },
    [headers]
  );

  const post = useCallback(
    async (endpoint: string, data: object) => {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const responseError = await response.text();
        throw new Error(responseError);
      }

      return response.json();
    },
    [headers]
  );

  const put = useCallback(
    async (endpoint: string, data: object) => {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const responseError = await response.text();
        throw new Error(responseError);
      }

      return response.json();
    },
    [headers]
  );

  const remove = useCallback(
    async (endpoint: string) => {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "DELETE",
        headers
      });

      if (!response.ok) {
        const responseError = await response.text();
        throw new Error(responseError);
      }
    },
    [headers]
  );

  return {
    get,
    post,
    put,
    remove
  };
};

export default useApi;
