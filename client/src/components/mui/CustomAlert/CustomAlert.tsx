import { useState } from "react";

import Fade from "@mui/material/Fade";

import CustomBox from "components/mui/CustomBox";

import StyledCustomAlert from "./StyledCustomAlert";
import StyledCloseIcon from "./StyledCloseIcon/StyledCloseIcon";

import { CustomAlertProps } from "./CustomAlert.models";

const CustomAlert = ({
  color = "info",
  dismissible = false,
  children,
  ...others
}: CustomAlertProps): JSX.Element | null => {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate: any = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <StyledCustomAlert $ownerState={{ color }} {...others}>
        <CustomBox display="flex" alignItems="center" color="white">
          {children}
        </CustomBox>
        {dismissible ? (
          <StyledCloseIcon onClick={mount ? handleAlertStatus : undefined}>
            &times;
          </StyledCloseIcon>
        ) : null}
      </StyledCustomAlert>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
};

export default CustomAlert;
