import * as Yup from "yup";

export const registerSchema = (t: (key: string) => string) => {
  return Yup.object().shape({
    name: Yup.string().required(t("auth.nameRequired")),

    email: Yup.string()
      .required(t("auth.emailRequired"))
      .email(t("auth.invalidEmail")),

    password: Yup.string()
      .required(t("auth.passwordRequired"))
      .min(6, t("auth.passwordTooShort"))
  });
};

export const loginSchema = (t: (key: string) => string) => {
  return Yup.object().shape({
    email: Yup.string()
      .required(t("auth.emailRequired"))
      .email(t("auth.invalidEmail")),

    password: Yup.string().required(t("auth.passwordRequired"))
  });
};
