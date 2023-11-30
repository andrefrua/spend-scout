import { useContext } from "react";

import { UIContext } from "./UIProvider";

const useUIContext = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUIContext should be used inside the UIProvider.");
  }

  return context;
};

export default useUIContext;
