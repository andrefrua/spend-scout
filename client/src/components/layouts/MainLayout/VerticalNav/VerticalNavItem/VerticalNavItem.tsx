import Collapse, { CollapseProps } from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import { Theme } from "@mui/material/styles";

import CustomBox from "components/mui/CustomBox";

import { useUIContext } from "context/UIProvider";
import { VerticalNavItemColor } from "generated/models/userPreferences";

import { item, itemContent, itemArrow } from "./VerticalNavItem.styles";
import { VerticalNavItemProps } from "./VerticalNavItem.models";

const VerticalNavItem = ({
  color = VerticalNavItemColor.INFO,
  name,
  active = false,
  children = false,
  open = false,
  ...others
}: VerticalNavItemProps): JSX.Element => {
  const {
    state: { isVerticalNavCollapsed, verticalNavColor, isDarkMode }
  } = useUIContext();

  return (
    <>
      <ListItem
        {...others}
        component="li"
        sx={(theme: Theme) =>
          item(theme, {
            active,
            color,
            verticalNavColor,
            isDarkMode
          })
        }>
        <CustomBox
          sx={(theme: Theme) =>
            itemContent(theme, {
              active,
              isVerticalNavCollapsed,
              name,
              verticalNavColor,
              isDarkMode
            })
          }>
          <ListItemText primary={name} />
          {children && (
            <Icon
              component="i"
              sx={theme =>
                itemArrow(theme, {
                  open,
                  active,
                  isVerticalNavCollapsed,
                  verticalNavColor,
                  isDarkMode
                })
              }>
              expand_less
            </Icon>
          )}
        </CustomBox>
      </ListItem>
      {children && (
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          {...(others as CollapseProps)}>
          {children}
        </Collapse>
      )}
    </>
  );
};

export default VerticalNavItem;
