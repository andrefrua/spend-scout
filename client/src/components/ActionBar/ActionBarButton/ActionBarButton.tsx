import Icon from "@mui/material/Icon";

import CustomButton from "components/mui/CustomButton";
import { CustomButtonProps } from "components/mui/CustomButton/CustomButton.models";

export type ActionBarButtonProps = CustomButtonProps & { icon?: string };

const ActionBarButton = ({
  icon,
  children,
  ...others
}: ActionBarButtonProps) => {
  return (
    <CustomButton
      sx={{
        ml: { xs: 2, sm: 1 },
        mt: { xs: 1, sm: 0 },
        mb: { xs: 1, sm: 0 }
      }}
      variant="outlined"
      {...others}>
      {icon && <Icon sx={{ mr: 0.5 }}>{icon}</Icon>}
      {children}
    </CustomButton>
  );
};

export default ActionBarButton;
