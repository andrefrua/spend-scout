import { createContext, useReducer, useMemo } from "react";

import {
  BrandingState,
  BrandingAction,
  BrandingProviderProps
} from "./BrandingProvider.models";

/**
 * The initial / default Branding state.
 */
const initialBrandingState: BrandingState = {
  brandName: "SpendScout",
  brandHref: "/",
  brandLogo: undefined,
  links: [
    { name: "Example Link 1", href: "#" },
    { name: "Example Link 2", href: "#" },
    { name: "Example Link 3", href: "#" }
  ]
};

/**
 * The Branding Reducer function.
 *
 * @param state - The current branding state.
 * @param action - The action that will be used to update the state.
 * @returns The updated state.
 */
const brandingReducer = (
  state: BrandingState,
  action: BrandingAction
): BrandingState => {
  switch (action.type) {
    default: {
      throw new Error(`Unhandled branding action type: ${action.type}`);
    }
  }
};

export const BrandingContext = createContext<{
  state: BrandingState;
  dispatch: React.Dispatch<BrandingAction>;
}>({
  state: initialBrandingState,
  dispatch: () => null
});

BrandingContext.displayName = "BrandingContext";

const BrandingProvider = ({ children }: BrandingProviderProps) => {
  const [state, dispatch] = useReducer(brandingReducer, {
    ...initialBrandingState
  });

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <BrandingContext.Provider value={value}>
      {children}
    </BrandingContext.Provider>
  );
};

export default BrandingProvider;
