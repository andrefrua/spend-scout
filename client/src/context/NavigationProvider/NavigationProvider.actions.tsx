import { Dispatch } from "react";

import {
  CustomRoute,
  NavigationAction,
  NavigationActionType
} from "./NavigationProvider.models";

const setRoutes = (
  dispatch: Dispatch<NavigationAction>,
  value: CustomRoute[]
) => dispatch({ type: NavigationActionType.SET_ROUTES, value });

export { setRoutes };
