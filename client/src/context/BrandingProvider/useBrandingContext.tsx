import { useContext } from "react";

import { BrandingContext } from "./BrandingProvider";

const useBrandingContext = () => {
  const context = useContext(BrandingContext);

  if (!context) {
    throw new Error(
      "useBrandingContext should be used inside the BrandingProvider."
    );
  }

  return context;
};

export default useBrandingContext;
