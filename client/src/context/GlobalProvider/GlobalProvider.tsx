import { BrowserRouter } from "react-router-dom";

import AuthProvider from "context/AuthProvider";
import NavigationProvider from "context/NavigationProvider";
import UIProvider from "context/UIProvider";
import BrandingProvider from "context/BrandingProvider";
import SnackbarProvider from "context/SnackbarProvider";
import DialogProvider from "context/DialogProvider";
import ThemeWrapperProvider from "context/ThemeWrapperProvider";

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationProvider>
          <UIProvider>
            <BrandingProvider>
              <ThemeWrapperProvider>
                <SnackbarProvider>
                  <DialogProvider>{children}</DialogProvider>
                </SnackbarProvider>
              </ThemeWrapperProvider>
            </BrandingProvider>
          </UIProvider>
        </NavigationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default GlobalProvider;
