import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/pt";

import AuthProvider from "context/AuthProvider";
import NavigationProvider from "context/NavigationProvider";
import UIProvider from "context/UIProvider";
import BrandingProvider from "context/BrandingProvider";
import SnackbarProvider from "context/SnackbarProvider";
import DialogProvider from "context/DialogProvider";
import ThemeWrapperProvider from "context/ThemeWrapperProvider";

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationProvider>
          <UIProvider>
            <BrandingProvider>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={i18n.language}>
                <ThemeWrapperProvider>
                  <SnackbarProvider>
                    <DialogProvider>{children}</DialogProvider>
                  </SnackbarProvider>
                </ThemeWrapperProvider>
              </LocalizationProvider>
            </BrandingProvider>
          </UIProvider>
        </NavigationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default GlobalProvider;
