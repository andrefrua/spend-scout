import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";
import CustomButton from "components/mui/CustomButton";
import CoverLayout from "components/layouts/CoverLayout";
import Loading from "components/Loading";
import FormField from "components/forms/FormField";

import { useBrandingContext } from "context/BrandingProvider";

import useAuthApi from "hooks/useAuthApi";
import { loginFormSchema } from "lib/yup/auth";

// Images
import coverImage from "assets/images/spendScountCover.jpg";

import { LoginData } from "./Login.models";

const Login = (): JSX.Element => {
  const { t } = useTranslation();

  const {
    state: { brandName }
  } = useBrandingContext();

  const { login, isLoading, error: loginError } = useAuthApi();

  const initialFormValues: LoginData = {
    email: "",
    password: "",
    rememberMe: false
  };

  const submitHandler = async (loginData: LoginData) => {
    await login(loginData.email, loginData.password, loginData.rememberMe);
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
            {t("login.enterYourData")}
          </CustomTypography>
        </CustomBox>
        <CustomBox pt={1} pb={1} px={2}>
          <Formik
            initialValues={initialFormValues}
            validationSchema={useMemo(() => loginFormSchema(t), [t])}
            onSubmit={submitHandler}>
            {({ errors, touched, values, isSubmitting }) => (
              <Form>
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
                  />
                </CustomBox>
                <CustomBox alignItems="center" ml={-1}>
                  <FormField
                    type="checkbox"
                    name="rememberMe"
                    as={Switch}
                    label={t("login.rememberMe")}>
                    <CustomTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      sx={{ cursor: "pointer", userSelect: "none", ml: 0.1 }}>
                      {t("login.rememberMe")}
                    </CustomTypography>
                  </FormField>
                </CustomBox>
                {loginError && (
                  <CustomBox mt={1} textAlign="center">
                    <CustomTypography color="error" fontSize={14}>
                      {t(loginError)}
                    </CustomTypography>
                  </CustomBox>
                )}
                <CustomBox mt={1} mb={1}>
                  <CustomButton
                    variant="gradient"
                    type="submit"
                    color="info"
                    fullWidth>
                    {isLoading || isSubmitting ? <Loading /> : t("login.login")}
                  </CustomButton>
                </CustomBox>
                <CustomBox mt={2} mb={1} textAlign="center">
                  <CustomTypography variant="button" color="text">
                    {t("login.dontHaveAccount")}
                    <CustomTypography
                      component={Link}
                      to="/register"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      ml={1}>
                      {t("register.register")}
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

export default Login;
