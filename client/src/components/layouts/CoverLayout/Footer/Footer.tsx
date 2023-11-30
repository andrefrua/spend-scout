import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";

import { useBrandingContext } from "context/BrandingProvider";

import typography from "assets/theme/base/typography";

import { FooterProps } from "./Footer.models";

const Footer = ({ light = false }: FooterProps): JSX.Element => {
  const {
    state: { brandName, brandHref }
  } = useBrandingContext();

  const { size } = typography;

  return (
    <CustomBox width="100%" pb={4}>
      <Container>
        <CustomBox
          width="100%"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems="center"
          px={1.5}>
          <CustomBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            color={light ? "white" : "text"}
            fontSize={size.sm}>
            &copy; {new Date().getFullYear()} -
            <Link href={brandHref} target="_blank">
              <CustomTypography
                variant="button"
                fontWeight="medium"
                color={light ? "white" : "dark"}>
                &nbsp;{brandName}&nbsp;
              </CustomTypography>
            </Link>
          </CustomBox>
        </CustomBox>
      </Container>
    </CustomBox>
  );
};

export default Footer;
