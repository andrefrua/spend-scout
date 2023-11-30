import { Modal } from "@mui/material";
import { Theme } from "@mui/material/styles";

import { CustomBox } from "components/mui";

interface CustomModalProps {
  open: boolean;
  onClose?: (event: any, reason: string) => void;
  children?: React.ReactNode;
}

const CustomModal = ({ open, onClose, children }: CustomModalProps) => {
  return (
    <Modal open={open} onClose={(event, reason) => onClose?.(event, reason)}>
      <CustomBox
        sx={({
          borders: { borderColor, borderWidth, borderRadius },
          palette: { background }
        }: Theme) => ({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: background.default,
          border: `${borderWidth[1]} solid ${borderColor}`,
          borderRadius: borderRadius.md,
          boxShadow: 24,
          p: 2
        })}>
        {children}
      </CustomBox>
    </Modal>
  );
};

export default CustomModal;
