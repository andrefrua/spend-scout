import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { Formik, Form } from "formik";

import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";
import CustomButton from "components/mui/CustomButton";
import CoverLayout from "components/layouts/CoverLayout";
import Loading from "components/Loading";
import FormField from "components/forms/FormField";

import { useBrandingContext } from "context/BrandingProvider";

import useAuthApi from "hooks/useAuthApi";
import { registerFormSchema } from "lib/yup/auth";

// Images
import coverImage from "assets/images/spendScountCover.jpg";

import { RegisterData } from "./Register.models";

const Register = (): JSX.Element => {
  const { t } = useTranslation();
  const { register, isLoading, error: registerError } = useAuthApi();

  const {
    state: { brandName }
  } = useBrandingContext();

  const initialFormValues: RegisterData = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    acceptTerms: false
  };

  const submitHandler = async (userData: RegisterData) => {
    await register(userData.name, userData.email, userData.password);
  };

  return (
    <CoverLayout image={coverImage}>
      <Card>
        <CustomBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center">
          <CustomTypography
            variant="h4"
            fontWeight="medium"
            color="white"
            mt={1}>
            {brandName}
          </CustomTypography>
          <CustomTypography
            display="block"
            variant="button"
            color="white"
            my={1}>
            {t("register.enterYourData")}
          </CustomTypography>
        </CustomBox>
        <CustomBox pt={1} pb={1} px={2}>
          <Formik
            initialValues={initialFormValues}
            validationSchema={useMemo(() => registerFormSchema(t), [t])}
            onSubmit={submitHandler}>
            {({ errors, touched, values, isSubmitting }) => (
              <Form>
                <CustomBox mb={1}>
                  <FormField
                    type="text"
                    name="name"
                    label={t("common.name")}
                    placeholder={t("common.exampleName")}
                    error={errors.name && touched.name}
                    success={!errors.name && values.name.length > 0}
                  />
                </CustomBox>
                <CustomBox mb={1}>
                  <FormField
                    type="text"
                    name="email"
                    label={t("common.email")}
                    placeholder={t("common.exampleEmail")}
                    error={errors.email && touched.email}
                    success={!errors.email && values.email.length > 0}
                  />
                </CustomBox>
                <CustomBox mb={1}>
                  <FormField
                    type="password"
                    name="password"
                    label={t("common.password")}
                    placeholder="************"
                    error={errors.password && touched.password}
                    success={!errors.password && values.password.length > 0}
                  />
                </CustomBox>
                <CustomBox mb={1}>
                  <FormField
                    type="password"
                    name="repeatPassword"
                    label={t("register.repeatPassword")}
                    placeholder="************"
                    error={errors.repeatPassword && touched.repeatPassword}
                    success={
                      !errors.repeatPassword && values.repeatPassword.length > 0
                    }
                  />
                </CustomBox>
                <CustomBox mb={1}>
                  <FormField
                    type="checkbox"
                    name="acceptTerms"
                    as={Checkbox}
                    label={t("register.acceptTerms")}
                    error={errors.acceptTerms && touched.acceptTerms}>
                    <Trans
                      style={{ backgroundColor: "red" }}
                      i18nKey="register.acceptTermsAndConditions"
                      components={{
                        text: (
                          <CustomTypography
                            variant="button"
                            fontWeight="regular"
                            color="text"
                            sx={{ marginRight: "2px" }}
                          />
                        ),
                        target: (
                          <CustomTypography
                            component={Link}
                            to="/terms-and-conditions"
                            variant="button"
                            color="info"
                            fontWeight="medium"
                          />
                        )
                      }}
                    />
                  </FormField>
                </CustomBox>
                {registerError && (
                  <CustomBox mt={1} textAlign="center">
                    <CustomTypography color="error" fontSize={14}>
                      {registerError}
                    </CustomTypography>
                  </CustomBox>
                )}
                <CustomBox mt={1} mb={1}>
                  <CustomButton
                    type="submit"
                    variant="gradient"
                    color="info"
                    fullWidth>
                    {isLoading || isSubmitting ? (
                      <Loading />
                    ) : (
                      t("register.register")
                    )}
                  </CustomButton>
                </CustomBox>
                <CustomBox mt={2} mb={1} textAlign="center">
                  <CustomTypography variant="button" color="text">
                    {`${t("register.alreadyHaveAnAccount")} `}
                    <CustomTypography
                      component={Link}
                      to="/login"
                      variant="button"
                      color="info"
                      fontWeight="medium">
                      {t("login.login")}
                    </CustomTypography>
                  </CustomTypography>
                </CustomBox>
              </Form>
            )}
          </Formik>
        </CustomBox>
      </Card>
    </CoverLayout>
  );
};

export default Register;
