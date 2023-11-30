import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";

import CustomBox from "components/mui/CustomBox";

import PageLayout from "components/layouts/PageLayout";

import Footer from "./Footer";

import { CoverLayoutProps } from "./CoverLayout.models";

const CoverLayout = ({
  coverHeight = "40vh",
  image,
  children
}: CoverLayoutProps): JSX.Element => {
  return (
    <PageLayout>
      <CustomBox
        width="calc(100% - 2rem)"
        minHeight={coverHeight}
        borderRadius="xl"
        mx={2}
        my={2}
        pt={6}
        pb={28}
        sx={{
          flex: 1,
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients }
          }: Theme) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.4),
              rgba(gradients.dark.state, 0.4)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      <CustomBox
        mt={{ xs: -20, lg: -18 }}
        px={1}
        width="calc(100% - 2rem)"
        mx="auto"
        sx={{ flex: 1 }}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </CustomBox>
      <Footer />
    </PageLayout>
  );
};

export default CoverLayout;
