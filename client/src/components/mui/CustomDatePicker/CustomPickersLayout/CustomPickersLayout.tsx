import { useUIContext } from "context/UIProvider";

import StyledCustomPickersLayout from "./StyledCustomPickersLayout";

const CustomPickersLayout = (props: any) => {
  const {
    state: { isDarkMode, verticalNavItemColor }
  } = useUIContext();

  return (
    <StyledCustomPickersLayout
      {...props}
      $ownerState={{
        color: verticalNavItemColor,
        isDarkMode
      }}
    />
  );
};

export default CustomPickersLayout;
