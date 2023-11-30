import { Form, Formik } from "formik";

import Grid from "@mui/material/Grid";

import CustomBox from "components/mui/CustomBox";
import ActionBar from "components/forms/ActionBar";

import ErrorBar from "../ErrorBar";
import LoadingBar from "../LoadingBar";
import { DefaultFormikProps } from "./DefaultFormik.models";

const DefaultFormik = <T extends object>({
  initialValues,
  validationSchema,
  onSubmit,
  onCancel,
  title,
  description,
  error,
  isLoading,
  children
}: DefaultFormikProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {() => {
        return (
          <Form>
            <Grid container spacing={3} mb={2}>
              <Grid item xs={12}>
                <CustomBox>
                  <Grid container spacing={3}>
                    <ActionBar
                      title={title}
                      description={description}
                      onCancel={onCancel}
                    />

                    {error && <ErrorBar error={error} />}

                    {isLoading && <LoadingBar />}

                    {!isLoading && children}
                  </Grid>
                </CustomBox>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default DefaultFormik;
