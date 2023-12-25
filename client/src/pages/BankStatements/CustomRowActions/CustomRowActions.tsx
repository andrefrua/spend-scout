import { Tooltip, Icon } from "@mui/material";

import CustomButton from "components/mui/CustomButton";

interface CustomRowActionsProps {
  onClick: () => void;
  icon: string;
  title: string;
}

const CustomRowActions = ({ onClick, icon, title }: CustomRowActionsProps) => {
  return (
    <Tooltip title={title} placement="top-start">
      <CustomButton
        sx={{ ml: 0.5 }}
        variant="outlined"
        color="info"
        iconOnly
        onClick={onClick}>
        <Icon>{icon}</Icon>
      </CustomButton>
    </Tooltip>
  );
};

export default CustomRowActions;
