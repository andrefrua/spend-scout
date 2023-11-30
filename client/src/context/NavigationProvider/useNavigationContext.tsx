import { useContext } from "react";

import { NavigationContext } from "./NavigationProvider";

const useNavigationContext = () => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error(
      "useNavigationContext should be used inside the NavigationProvider."
    );
  }

  return context;
};

export default useNavigationContext;
