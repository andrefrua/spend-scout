import { createContext, useReducer, useMemo } from "react";

import CustomDialog from "components/mui/CustomDialog";
import { CustomDialogProps } from "components/mui/CustomDialog/CustomDialog.models";

import {
  DialogState,
  DialogActions,
  DialogAction,
  DialogActionType,
  DialogProviderProps
} from "./DialogProvider.models";
import { hideDialog, showDialog } from "./DialogProvider.actions";

/**
 * The initial / default Dialog state.
 */
const initialDialogState: DialogState = {
  dialogProps: {
    open: false,
    onConfirm: () => undefined,
    onCancel: () => undefined
  }
};

/**
 * The initial / default Dialog actions.
 */
const initialDialogActions: DialogActions = {
  showDialog: () => undefined,
  hideDialog: () => undefined
};

/**
 * The Dialog Reducer function.
 *
 * @param state - The current Dialog state.
 * @param action - The action that will be used to update the state.
 * @returns The updated state.
 */
const dialogReducer = (
  state: DialogState,
  action: DialogAction
): DialogState => {
  switch (action.type) {
    case DialogActionType.SHOW_DIALOG:
      return {
        ...state,
        dialogProps: {
          ...(action.value as CustomDialogProps)
        }
      };
    case DialogActionType.HIDE_DIALOG:
      return {
        ...state,
        dialogProps: initialDialogState.dialogProps
      };
    default: {
      throw new Error(`Unhandled Dialog action type: ${action.type}`);
    }
  }
};

export const DialogContext = createContext<{
  state: DialogState;
  actions: DialogActions;
}>({
  state: initialDialogState,
  actions: initialDialogActions
});

DialogContext.displayName = "DialogContext";

const DialogPovider = ({ children }: DialogProviderProps) => {
  const [state, dispatch] = useReducer(dialogReducer, initialDialogState);

  const actions = useMemo(
    () => ({
      showDialog: (value: CustomDialogProps) => showDialog(dispatch, value),
      hideDialog: () => hideDialog(dispatch)
    }),
    [dispatch]
  );

  const value = useMemo(() => ({ state, actions }), [state, actions]);

  return (
    <DialogContext.Provider value={value}>
      <CustomDialog {...state.dialogProps} />
      {children}
    </DialogContext.Provider>
  );
};

export default DialogPovider;
