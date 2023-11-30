import { Theme } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

import CustomBox from "components/mui/CustomBox";

import { useUIContext } from "context/UIProvider";

import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
  collapseArrow
} from "./VerticalNavCollpase.styles";

import { VerticalNavCollapseProps } from "./VerticalNavCollpase.models";

const VerticalNavCollpase = ({
  icon,
  name,
  children,
  active,
  noCollapse,
  open,
  ...others
}: VerticalNavCollapseProps): JSX.Element => {
  const {
    state: {
      isVerticalNavCollapsed,
      verticalNavItemColor,
      verticalNavColor,
      isDarkMode
    }
  } = useUIContext();

  return (
    <>
      <ListItem component="li">
        <CustomBox
          {...others}
          sx={(theme: Theme) =>
            collapseItem(theme, {
              active,
              verticalNavItemColor,
              verticalNavColor,
              isDarkMode,
              noCollapse
            })
          }>
          <ListItemIcon
            sx={theme =>
              collapseIconBox(theme, {
                verticalNavColor,
                isDarkMode
              })
            }>
            {typeof icon === "string" ? (
              <Icon sx={theme => collapseIcon(theme, { active })}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={theme =>
              collapseText(theme, {
                isVerticalNavCollapsed,
                verticalNavColor,
                active
              })
            }
          />

          <Icon
            sx={theme =>
              collapseArrow(theme, {
                noCollapse,
                verticalNavColor,
                isVerticalNavCollapsed,
                open,
                active,
                isDarkMode
              })
            }>
            expand_less
          </Icon>
        </CustomBox>
      </ListItem>
      {children && (
        <Collapse in={Boolean(open)} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
};

// Declaring default props for SidenavCollapse
VerticalNavCollpase.defaultProps = {
  active: false,
  noCollapse: false,
  children: false,
  open: false
};

export default VerticalNavCollpase;
