import { CustomDialogProps } from "components/mui/CustomDialog/CustomDialog.models";

/**
 * The Dialog state representation
 */
export interface DialogState {
  dialogProps: CustomDialogProps;
}

export interface DialogActions {
  showDialog: (value: CustomDialogProps) => void;
  hideDialog: () => void;
}

/**
 * Dialog action types to be used by the dialogReducer
 */
export enum DialogActionType {
  SHOW_DIALOG = "SHOW_DIALOG",
  HIDE_DIALOG = "HIDE_DIALOG"
}

/**
 * Dialog Action definition
 */
export interface DialogAction {
  type: DialogActionType;
  value?: CustomDialogProps | string;
}

/**
 * The DialogProvider properties definition
 */
export interface DialogProviderProps {
  children?: React.ReactNode;
}
