/**
 * The Navigation state representation
 */
export interface NavigationState {
  routes: CustomRoute[];
}

/**
 * Navigation action types to be used by the navigationReducer
 */
export enum NavigationActionType {
  SET_ROUTES = "SET_ROUTES"
}

/**
 * Navigation Action definition
 */
export interface NavigationAction {
  type: NavigationActionType;
  value: CustomRoute[];
}

/**
 * The NavigationProvider properties definition
 */
export interface NavigationProviderProps {
  children?: React.ReactNode;
}

export enum CustomRouteType {
  /**
   * `parent` - Parent collapsable menu in the VerticalNav.
   */
  PARENT = "parent",
  /**
   * `child` - Child menu in the VerticalNav.
   */
  CHILD = "child",
  /**
   * `href` - Href menu.
   */
  HREF = "href",
  /**
   * `title` - Will be displayed as a title in the VerticalNav.
   */
  TITLE = "title",
  /**
   * `divider` - Will be displayed as a divider in the VerticalNav.
   */
  DIVIDER = "divider"
}

export type CustomRoute =
  | {
      type: CustomRouteType.PARENT;
      name: string;
      key: string;
      /**
       * Icon that will be displayed for the route in the VerticalNav.
       */
      icon: React.ReactNode;
      route?: string;
      component?: React.ReactNode;
      /**
       * Array of child routes that will be displayed in a collapsable menu.
       */
      subRoutes?: CustomRoute[];
    }
  | {
      type: CustomRouteType.CHILD;
      name: string;
      key: string;
      route?: string;
      component?: React.ReactNode;
      /**
       * Array of child routes that will be displayed in a collapsable menu.
       */
      subRoutes?: CustomRoute[];
    }
  | {
      type: CustomRouteType.HREF;
      name: string;
      key: string;
      /**
       * Icon that will be displayed for the route in the VerticalNav.
       */
      icon: React.ReactNode;
      /**
       * The href in case we want to navigate to an external url.
       */
      href?: string;
    }
  | {
      type: CustomRouteType.TITLE;
      key: string;
      /**
       * Used only for the routes of type `title` and it is the value that will be displayed on the VerticalNav.
       */
      title: string;
    }
  | { type: CustomRouteType.DIVIDER; key: string };
