import { useState, useCallback } from "react";

import { useAuthContext } from "context/AuthProvider";

import useApi from "./useApi";

const useAuthApi = () => {
  const {
    actions: { loggedIn },
    state: { token }
  } = useAuthContext();
  const { post } = useApi({ token });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (
      email: string,
      password: string,
      rememberMe: boolean
    ): Promise<void> => {
      try {
        setIsLoading(true);

        const response = await post("/login", { email, password, rememberMe });

        loggedIn({ ...response });
      } catch (catchedError) {
        setError((catchedError as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [post, loggedIn]
  );

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<void> => {
      try {
        // TODO: We should also set a remember me when registering the user
        setIsLoading(true);

        const response = await post("/register", { name, email, password });

        loggedIn({ ...response });
      } catch (catchedError) {
        setError((catchedError as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [post, loggedIn]
  );

  return {
    isLoading,
    error,
    login,
    register
  };
};

export default useAuthApi;
