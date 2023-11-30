import Card from "@mui/material/Card";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";
import CustomInput from "components/mui/CustomInput";
import CustomButton from "components/mui/CustomButton";

import CoverLayout from "components/layouts/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

const ResetPassword = (): JSX.Element => {
  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <CustomBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center">
          <CustomTypography
            variant="h3"
            fontWeight="medium"
            color="white"
            mt={1}>
            Reset Password
          </CustomTypography>
          <CustomTypography
            display="block"
            variant="button"
            color="white"
            my={1}>
            You will receive an e-mail in maximum 60 seconds
          </CustomTypography>
        </CustomBox>
        <CustomBox pt={4} pb={3} px={3}>
          <CustomBox component="form" role="form">
            <CustomBox mb={4}>
              <CustomInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
              />
            </CustomBox>
            <CustomBox mt={6} mb={1}>
              <CustomButton variant="gradient" color="info" fullWidth>
                reset
              </CustomButton>
            </CustomBox>
          </CustomBox>
        </CustomBox>
      </Card>
    </CoverLayout>
  );
};

export default ResetPassword;
