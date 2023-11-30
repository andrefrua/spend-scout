import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";
import CustomAvatar from "components/mui/CustomAvatar";

import { useAuthContext } from "context/AuthProvider";

const Header = (): JSX.Element => {
  const {
    state: { name, profileImage }
  } = useAuthContext();

  return (
    <Card id="profile">
      <CustomBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            {/* <CustomAvatar
              src={profileImage}
              alt="profile-image"
              size="xl"
              shadow="sm"
            /> */}
            <CustomAvatar
              src={profileImage}
              alt={name}
              size="sm"
              bgColor="dark"
            />
          </Grid>
          <Grid item>
            <CustomBox height="100%" mt={0.5} lineHeight={1}>
              <CustomTypography variant="h5" fontWeight="medium">
                {name}
              </CustomTypography>
            </CustomBox>
          </Grid>
        </Grid>
      </CustomBox>
    </Card>
  );
};

export default Header;
