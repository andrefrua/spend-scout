import { useSnackbar, SnackbarOrigin } from "notistack";

import { CustomSnackbarVariant } from "components/Snackbars/Snackbar.models";

const useCustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const defaultOptions = {
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right"
    } as SnackbarOrigin
  };

  const showSnackbarSuccess = (
    message: string | React.ReactNode,
    title?: string | React.ReactNode
  ) => {
    // Pass custom data as customProps property
    const mergedOptions = {
      ...defaultOptions,
      variant: "custom" as CustomSnackbarVariant,
      customProps: {
        title,
        variant: "success",
        icon: "check"
      }
    };

    enqueueSnackbar(message, mergedOptions);
  };

  const showSnackbarInfo = (
    message: string | React.ReactNode,
    title?: string | React.ReactNode
  ) => {
    // Pass custom data as customProps property
    const mergedOptions = {
      ...defaultOptions,
      variant: "custom" as CustomSnackbarVariant,
      customProps: {
        title,
        icon: "notifications"
      }
    };

    enqueueSnackbar(message, mergedOptions);
  };

  const showSnackbarWarning = (
    message: string | React.ReactNode,
    title?: string | React.ReactNode
  ) => {
    // Pass custom data as customProps property
    const mergedOptions = {
      ...defaultOptions,
      variant: "custom" as CustomSnackbarVariant,
      customProps: {
        title,
        variant: "warning",
        icon: "warning"
      }
    };

    enqueueSnackbar(message, mergedOptions);
  };

  const showSnackbarError = (
    message: string | React.ReactNode,
    title?: string | React.ReactNode
  ) => {
    // Pass custom data as customProps property
    const mergedOptions = {
      ...defaultOptions,
      variant: "custom" as CustomSnackbarVariant,
      customProps: {
        title,
        variant: "error",
        icon: "warning"
      }
    };

    enqueueSnackbar(message, mergedOptions);
  };

  return {
    showSnackbarSuccess,
    showSnackbarInfo,
    showSnackbarWarning,
    showSnackbarError
  };
};

export default useCustomSnackbar;
