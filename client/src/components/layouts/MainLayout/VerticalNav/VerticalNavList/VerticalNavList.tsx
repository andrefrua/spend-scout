import List from "@mui/material/List";

import { VerticalNavListProps } from "./VerticalNavList.models";

const VerticalNavList = ({ children }: VerticalNavListProps): JSX.Element => {
  return (
    <List
      sx={{
        px: 2,
        my: 0.3
      }}>
      {children}
    </List>
  );
};

export default VerticalNavList;
