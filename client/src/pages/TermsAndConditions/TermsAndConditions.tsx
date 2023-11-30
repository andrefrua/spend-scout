import { Card } from "@mui/material";
import { Theme } from "@mui/material/styles";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";

// Images
import coverImage from "assets/images/spendScountCover.jpg";

import Footer from "./Footer";

const TermsAndConditions = (): JSX.Element => {
  return (
    <CustomBox mt={4} mb={3} mx={1}>
      <CustomBox position="relative" mb={5}>
        <CustomBox
          width="calc(100% - 2rem)"
          minHeight="40vh"
          borderRadius="xl"
          mx={2}
          my={2}
          pt={6}
          pb={28}
          sx={{
            backgroundImage: ({
              functions: { linearGradient, rgba },
              palette: { gradients }
            }: Theme) =>
              coverImage &&
              `${linearGradient(
                rgba(gradients.dark.main, 0.4),
                rgba(gradients.dark.state, 0.4)
              )}, url(${coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        <Card
          sx={{
            position: "relative",
            mt: -20,
            mx: 6,
            py: 2,
            px: 2
          }}>
          <CustomBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-6}
            p={3}
            mb={1}
            textAlign="center">
            <CustomTypography
              variant="h4"
              fontWeight="medium"
              color="white"
              mt={1}>
              Terms and Conditions
            </CustomTypography>
            <CustomTypography
              display="block"
              variant="button"
              color="white"
              my={1}>
              These are the terms and conditions
            </CustomTypography>
          </CustomBox>

          <CustomBox p={3} lineHeight={1}>
            <CustomBox mb={1}>
              <CustomTypography variant="h5">Term 1</CustomTypography>
            </CustomBox>
            <CustomTypography variant="button" color="text">
              This is the term 1 text This is the term 1 text This is the term 1
              text This is the term 1 text This is the term 1 text This is the
              term 1 text This is the term 1 text This is the term 1 text This
              is the term 1 text This is the term 1 text This is the term 1 text
              This is the term 1 text This is the term 1 text This is the term 1
              text
            </CustomTypography>
          </CustomBox>

          <CustomBox p={3} lineHeight={1}>
            <CustomBox mb={1}>
              <CustomTypography variant="h5">Term 2</CustomTypography>
            </CustomBox>
            <CustomTypography variant="button" color="text">
              This is the term 2 text This is the term 2 text This is the term 2
              text This is the term 2 text This is the term 2 text This is the
              term 2 text This is the term 2 text This is the term 2 text This
              is the term 2 text This is the term 2 text This is the term 2 text
              This is the term 2 text This is the term 2 text This is the term 2
              text
            </CustomTypography>
          </CustomBox>

          <CustomBox p={3} lineHeight={1}>
            <CustomBox mb={1}>
              <CustomTypography variant="h5">Term 2</CustomTypography>
            </CustomBox>
            <CustomTypography variant="button" color="text">
              This is the term 2 text This is the term 2 text This is the term 2
              text This is the term 2 text This is the term 2 text This is the
              term 2 text This is the term 2 text This is the term 2 text This
              is the term 2 text This is the term 2 text This is the term 2 text
              This is the term 2 text This is the term 2 text This is the term 2
              text
            </CustomTypography>
          </CustomBox>

          <CustomBox p={3} lineHeight={1}>
            <CustomBox mb={1}>
              <CustomTypography variant="h5">Term 2</CustomTypography>
            </CustomBox>
            <CustomTypography variant="button" color="text">
              This is the term 2 text This is the term 2 text This is the term 2
              text This is the term 2 text This is the term 2 text This is the
              term 2 text This is the term 2 text This is the term 2 text This
              is the term 2 text This is the term 2 text This is the term 2 text
              This is the term 2 text This is the term 2 text This is the term 2
              text
            </CustomTypography>
          </CustomBox>

          <CustomBox p={3} lineHeight={1}>
            <CustomBox mb={1}>
              <CustomTypography variant="h5">Term 2</CustomTypography>
            </CustomBox>
            <CustomTypography variant="button" color="text">
              This is the term 2 text This is the term 2 text This is the term 2
              text This is the term 2 text This is the term 2 text This is the
              term 2 text This is the term 2 text This is the term 2 text This
              is the term 2 text This is the term 2 text This is the term 2 text
              This is the term 2 text This is the term 2 text This is the term 2
              text
            </CustomTypography>
          </CustomBox>

          <CustomBox p={3} lineHeight={1}>
            <CustomBox mb={1}>
              <CustomTypography variant="h5">Term 2</CustomTypography>
            </CustomBox>
            <CustomTypography variant="button" color="text">
              This is the term 2 text This is the term 2 text This is the term 2
              text This is the term 2 text This is the term 2 text This is the
              term 2 text This is the term 2 text This is the term 2 text This
              is the term 2 text This is the term 2 text This is the term 2 text
              This is the term 2 text This is the term 2 text This is the term 2
              text
            </CustomTypography>
          </CustomBox>

          <CustomBox p={3} lineHeight={1}>
            <CustomBox mb={1}>
              <CustomTypography variant="h5">Term 2</CustomTypography>
            </CustomBox>
            <CustomTypography variant="button" color="text">
              This is the term 2 text This is the term 2 text This is the term 2
              text This is the term 2 text This is the term 2 text This is the
              term 2 text This is the term 2 text This is the term 2 text This
              is the term 2 text This is the term 2 text This is the term 2 text
              This is the term 2 text This is the term 2 text This is the term 2
              text
            </CustomTypography>
          </CustomBox>
        </Card>
      </CustomBox>

      <Footer />
    </CustomBox>
  );
};

export default TermsAndConditions;
