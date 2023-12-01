import { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";

import Grid from "@mui/material/Grid";

import CustomBox from "components/mui/CustomBox";
import ActionBar from "components/forms/ActionBar";
import useBlockNavigationPrompt from "hooks/useBlockNavigationPrompt";

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
  const { setShouldBlock } = useBlockNavigationPrompt();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (values: T, formikHelpers: FormikHelpers<T>) => {
    setIsSubmitting(true);
    setShouldBlock(false);
    await onSubmit(values, formikHelpers);
    setIsSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={submitHandler}>
      {({ dirty }) => {
        // The setTimeout is needed to a limiation in Formik: https://stackoverflow.com/questions/61031464/setstate-called-in-render-prop-is-causing-a-react-warning
        setTimeout(() => setShouldBlock(dirty && !isSubmitting), 0);

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
