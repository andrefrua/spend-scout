import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";
import CustomButton from "components/mui/CustomButton";
import CustomInput from "components/mui/CustomInput";

const ChangePassword = (): JSX.Element => {
  const passwordRequirements = [
    "One special characters",
    "Min 6 characters",
    "One number (2 are recommended)",
    "Change it often"
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <CustomBox
        key={itemKey}
        component="li"
        color="text"
        fontSize="1.25rem"
        lineHeight={1}>
        <CustomTypography
          variant="button"
          color="text"
          fontWeight="regular"
          verticalAlign="middle">
          {item}
        </CustomTypography>
      </CustomBox>
    );
  });

  return (
    <Card id="change-password">
      <CustomBox p={3}>
        <CustomTypography variant="h5">Change Password</CustomTypography>
      </CustomBox>
      <CustomBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CustomInput
              fullWidth
              label="Current Password"
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              fullWidth
              label="New Password"
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              fullWidth
              label="Confirm New Password"
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
        </Grid>
        <CustomBox mt={6} mb={1}>
          <CustomTypography variant="h5">
            Password requirements
          </CustomTypography>
        </CustomBox>
        <CustomBox mb={1}>
          <CustomTypography variant="body2" color="text">
            Please follow this guide for a strong password
          </CustomTypography>
        </CustomBox>
        <CustomBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          flexWrap="wrap">
          <CustomBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
            {renderPasswordRequirements}
          </CustomBox>
          <CustomBox ml="auto">
            <CustomButton variant="gradient" color="dark" size="small">
              update password
            </CustomButton>
          </CustomBox>
        </CustomBox>
      </CustomBox>
    </Card>
  );
};

export default ChangePassword;
