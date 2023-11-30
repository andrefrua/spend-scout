import SnackbarContent from "components/Snackbars/SnackbarContent";
import {
  SnackbarProvider as NotistackProvider,
  SnackbarProviderProps as NotistackProviderProps
} from "notistack";

type CustomComponents = {
  custom: React.ElementType;
} & NotistackProviderProps["Components"];

interface SnackbarProviderProps {
  children: React.ReactNode;
}

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const customComponents: CustomComponents = {
    custom: SnackbarContent
  };

  return (
    <NotistackProvider
      // dense
      // renderVariant="wrapped"
      maxSnack={3}
      Components={customComponents}>
      {children}
    </NotistackProvider>
  );
};

export default SnackbarProvider;
