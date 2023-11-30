import { forwardRef } from "react";

import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import { Theme } from "@mui/material/styles";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";

import menuItem from "./NotificationItem.styles";
import { NotificationItemProps } from "./NotificationItem.models";

const NotificationItem = forwardRef<HTMLLIElement, NotificationItemProps>(
  (props, ref) => {
    const { icon, title, ...others }: NotificationItemProps = props;

    return (
      <MenuItem {...others} ref={ref} sx={(theme: Theme) => menuItem(theme)}>
        <CustomBox
          component={Link}
          py={0.5}
          display="flex"
          alignItems="center"
          lineHeight={1}>
          <CustomTypography variant="body1" color="secondary" lineHeight={0.75}>
            {icon}
          </CustomTypography>
          <CustomTypography
            variant="button"
            fontWeight="regular"
            sx={{ ml: 1 }}>
            {title}
          </CustomTypography>
        </CustomBox>
      </MenuItem>
    );
  }
);

export default NotificationItem;
