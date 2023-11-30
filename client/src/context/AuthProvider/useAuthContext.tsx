import { useContext } from "react";

import { AuthContext } from "./AuthProvider";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext should be used inside the AuthProvider.");
  }

  return context;
};

export default useAuthContext;
