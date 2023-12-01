import { useContext } from "react";

import { DialogContext } from "./DialogProvider";

const useDialogContext = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("DialogContext should be used inside the DialogProvider.");
  }

  return context;
};

export default useDialogContext;
