import CustomBox from "components/mui/CustomBox";

import { PageLayoutProps } from "./PageLayout.models";

const PageLayout = ({
  background = "default",
  children
}: PageLayoutProps): JSX.Element => {
  return (
    <CustomBox
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: "hidden", display: "flex", flexDirection: "column" }}>
      {children}
    </CustomBox>
  );
};

export default PageLayout;
