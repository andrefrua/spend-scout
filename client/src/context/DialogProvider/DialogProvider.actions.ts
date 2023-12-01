import { Dispatch } from "react";

import { CustomDialogProps } from "components/mui/CustomDialog/CustomDialog.models";

import { DialogAction, DialogActionType } from "./DialogProvider.models";

const showDialog = (
  dispatch: Dispatch<DialogAction>,
  value: CustomDialogProps
) => dispatch({ type: DialogActionType.SHOW_DIALOG, value });

const hideDialog = (dispatch: Dispatch<DialogAction>) =>
  dispatch({ type: DialogActionType.HIDE_DIALOG });

export { showDialog, hideDialog };
