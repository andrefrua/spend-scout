import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

// TODO: Review this import with the register, most likely we won't even use these library
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
  RadialLinearScale
} from "chart.js";

import CssBaseline from "@mui/material/CssBaseline";

import CustomRoutes from "components/CustomRoutes";
import MainLayout from "components/layouts/MainLayout";
import Loading from "components/Loading";

import { useAuthContext } from "context/AuthProvider";
import { useUIContext } from "context/UIProvider";
import { useBrandingContext } from "context/BrandingProvider";

import { initI18Next } from "lib/i18n";

Chart.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
  RadialLinearScale
);

initI18Next();

const App = () => {
  const {
    state: { verticalNavItemColor }
  } = useUIContext();

  const {
    state: { brandName }
  } = useBrandingContext();

  const {
    state: { isAuthenticated, isLoading }
  } = useAuthContext();

  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
  }, [pathname]);

  const renderContent = () => {
    if (isLoading) {
      return <Loading color={verticalNavItemColor} />;
    }

    if (isAuthenticated) {
      return (
        <MainLayout>
          <CustomRoutes />
        </MainLayout>
      );
    }

    return <CustomRoutes />;
  };

  return (
    <>
      <CssBaseline />

      <Helmet>
        <title>{brandName}</title>
      </Helmet>

      {renderContent()}
    </>
  );
};

export default App;
