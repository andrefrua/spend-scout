import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import CategoryForm from "pages/Categories/CategoryForm";
import { CustomRoute } from "context/NavigationProvider/NavigationProvider.models";
import { useNavigationContext } from "context/NavigationProvider";
import { useAuthContext } from "context/AuthProvider";
import Login from "pages/authentication/Login";
import Register from "pages/authentication/Register";
import TermsAndConditions from "pages/TermsAndConditions";
import TransactionForm from "pages/Transactions/TransactionForm";

const CustomRoutes = () => {
  const {
    state: { isAuthenticated }
  } = useAuthContext();
  const {
    state: { routes }
  } = useNavigationContext();

  const VerticalNavRoutes = useMemo(() => {
    const getRoutes = (allRoutes: CustomRoute[]): Array<JSX.Element | null> =>
      allRoutes.flatMap((route: CustomRoute) => {
        if ("subRoutes" in route) {
          return getRoutes(route.subRoutes || []);
        }

        if ("route" in route) {
          return (
            <Route
              path={route.route}
              element={route.component}
              key={route.key}
            />
          );
        }

        return null;
      });

    return getRoutes(routes);
  }, [routes]);

  const PrivateRoutes = useMemo(() => {
    return (
      <>
        {VerticalNavRoutes}
        <Route path="categories/create" element={<CategoryForm />} />
        <Route path="categories/edit/:categoryId" element={<CategoryForm />} />
        <Route path="transactions/create" element={<TransactionForm />} />
        <Route
          path="transactions/edit/:transactionId"
          element={<TransactionForm />}
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </>
    );
  }, [VerticalNavRoutes]);

  return (
    <Routes>
      {isAuthenticated ? (
        PrivateRoutes
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default CustomRoutes;
