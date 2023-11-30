interface BrandingLinks {
  name: string;
  href: string;
}

/**
 * The UI state representation
 */
export interface BrandingState {
  brandName: string;
  brandHref: string;
  brandLogo?: React.ReactNode;
  links: BrandingLinks[];
}

/**
 * Branding action types to be used by the brandingReducer
 */
export enum BrandingActionType {}

/**
 * Branding Action definition
 */
export interface BrandingAction {
  type: BrandingActionType;
  value: boolean | string;
}

/**
 * The BrandingProvider properties definition
 */
export interface BrandingProviderProps {
  children?: React.ReactNode;
}
