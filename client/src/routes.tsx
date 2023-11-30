import Icon from "@mui/material/Icon";

import {
  CustomRoute,
  CustomRouteType
} from "context/NavigationProvider/NavigationProvider.models";
import { UserInfo } from "context/AuthProvider/AuthProvider.models";

// import UserSettings from "pages/UserSettings";
import Dashboard from "pages/Dashboard";
import Categories from "pages/Categories";
import Transactions from "pages/Transactions";
import BankStatements from "pages/BankStatements";

import CustomAvatar from "components/mui/CustomAvatar";

export const createRoutes = (
  userInfo: UserInfo,
  translate: (key: string) => string
): CustomRoute[] => [
  {
    type: CustomRouteType.PARENT,
    name: userInfo.name || "",
    key: userInfo.email || "",
    icon: (
      <CustomAvatar src={userInfo.profileImage} alt={userInfo.name} size="sm" />
    )
    // route: `/${userInfo.name}/user-settings`,
    // component: <UserSettings />
  },
  { type: CustomRouteType.DIVIDER, key: "divider-0" },
  {
    type: CustomRouteType.PARENT,
    name: translate("dashboard.dashboard"),
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />
  },
  // {
  //   type: CustomRouteType.PARENT,
  //   name: translate("scheduler"),
  //   key: "scheduler",
  //   icon: <Icon fontSize="small">calendar_month</Icon>,
  //   route: "/scheduler",
  //   component: <Scheduler />
  // },
  {
    type: CustomRouteType.PARENT,
    name: translate("categories.categories"),
    key: "categories",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/categories",
    component: <Categories />
  },
  {
    type: CustomRouteType.PARENT,
    name: translate("transactions.transactions"),
    key: "transactions",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/transactions",
    component: <Transactions />
  },
  {
    type: CustomRouteType.PARENT,
    name: translate("bankStatements.bankStatement"),
    key: "bank-statements",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/bank-statements",
    component: <BankStatements />
  }
  // {
  //   type: CustomRouteType.PARENT,
  //   name: translate("legalProceedings.legalProceedings"),
  //   key: "legal-proceedings",
  //   icon: <Icon fontSize="small">folder_shared</Icon>,
  //   route: "/legal-proceedings",
  //   component: <LegalProceedings />
  // },

  // { type: CustomRouteType.DIVIDER, key: "divider-1" }
];
