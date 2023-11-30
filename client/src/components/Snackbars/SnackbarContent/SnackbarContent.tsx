import { forwardRef, useCallback } from "react";
import {
  useSnackbar,
  SnackbarContent as NotistackSnackbarContent,
  CustomContentProps
} from "notistack";

import CustomSnackbar from "components/mui/CustomSnackbar";
import { CustomSnackbarColor } from "components/mui/CustomSnackbar/CustomSnackbar.models";

export type SnackbarContentProps = CustomContentProps & {
  customProps: {
    variant: CustomSnackbarColor;
    title?: string;
    icon?: string | React.ReactNode;
  };
};

const SnackbarContent = forwardRef<HTMLDivElement, SnackbarContentProps>(
  ({ id, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const { customProps, message } = props;

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <NotistackSnackbarContent ref={ref}>
        <CustomSnackbar
          color={customProps.variant}
          icon={customProps.icon}
          title={customProps.title}
          content={message}
          close={handleDismiss}
          bgWhite
        />
      </NotistackSnackbarContent>
    );
  }
);

export default SnackbarContent;
