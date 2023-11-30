import Link from "@mui/material/Link";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";

import { useBrandingContext } from "context/BrandingProvider";

import typography from "assets/theme/base/typography";

const MainFooter = (): JSX.Element => {
  const {
    state: { brandName, brandHref }
  } = useBrandingContext();

  const { size } = typography;

  return (
    <CustomBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="bottom"
      px={1.5}>
      <CustomBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}>
        &copy; {new Date().getFullYear()} -
        <Link href={brandHref} target="_blank">
          <CustomTypography variant="button" fontWeight="medium">
            &nbsp;{brandName}&nbsp;
          </CustomTypography>
        </Link>
      </CustomBox>
    </CustomBox>
  );
};

export default MainFooter;
