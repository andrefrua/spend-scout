import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import CustomBox from "components/mui/CustomBox";
import Loading from "components/Loading";

import { useUIContext } from "context/UIProvider";

const LoadingBar = () => {
  const {
    state: { verticalNavItemColor }
  } = useUIContext();

  return (
    <Grid item xs={12}>
      <Card>
        <Loading color={verticalNavItemColor} />
        <CustomBox
          p={3}
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}>
          <Loading color={verticalNavItemColor} position="relative" />
        </CustomBox>
      </Card>
    </Grid>
  );
};

export default LoadingBar;
