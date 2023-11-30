import Grid from "@mui/material/Grid";

import CustomBox from "components/mui/CustomBox";

import Header from "./Header";
// import BasicInfo from "./BasicInfo";
// import ChangePassword from "./ChangePassword";

const CustomerForm = () => {
  return (
    <CustomBox mt={4}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CustomBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Header />
              </Grid>
              {/* <Grid item xs={12}>
                <BasicInfo />
              </Grid>
              <Grid item xs={12}>
                <ChangePassword />
              </Grid> */}
            </Grid>
          </CustomBox>
        </Grid>
      </Grid>
    </CustomBox>
  );
};

export default CustomerForm;
