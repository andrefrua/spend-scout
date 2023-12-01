import { Theme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import CustomButton from "components/mui/CustomButton";
import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";

import { CustomDialogProps } from "./CustomDialog.models";

const CustomDialog = ({
  open,
  title = "",
  message = "",
  confirmLabel = "",
  cancelLabel = "",
  onConfirm,
  onCancel
}: CustomDialogProps) => {
  return (
    <Dialog open={open} onClose={() => onCancel?.()}>
      <CustomBox
        sx={({ palette: { background } }: Theme) => ({
          backgroundColor: background.default
        })}>
        <DialogTitle>
          <CustomBox mb={1}>
            <CustomTypography variant="h5" fontWeight="medium">
              {title}
            </CustomTypography>
          </CustomBox>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <CustomTypography variant="text" color="text">
              {message}
            </CustomTypography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
            <CustomBox ml={{ xs: 2, sm: 1 }}>
              <CustomButton
                variant="outlined"
                color="secondary"
                onClick={() => onConfirm?.()}>
                {confirmLabel}
              </CustomButton>
            </CustomBox>

            <CustomBox
              ml={{ xs: 2, sm: 1 }}
              mt={{ xs: 1, sm: 0 }}
              mb={{ xs: 1, sm: 0 }}>
              <CustomButton
                variant="gradient"
                color="error"
                autoFocus
                onClick={() => onCancel?.()}>
                {cancelLabel}
              </CustomButton>
            </CustomBox>
          </CustomBox>
        </DialogActions>
      </CustomBox>
    </Dialog>
  );
};

export default CustomDialog;
