import "regenerator-runtime"; // TODO: Try to add this in some other way. Check vite configs or babel or something else...

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "App";

import AuthProvider from "context/AuthProvider";
import NavigationProvider from "context/NavigationProvider";
import UIProvider from "context/UIProvider";
import BrandingProvider from "context/BrandingProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <NavigationProvider>
        <UIProvider>
          <BrandingProvider>
            <App />
          </BrandingProvider>
        </UIProvider>
      </NavigationProvider>
    </AuthProvider>
  </BrowserRouter>
);
