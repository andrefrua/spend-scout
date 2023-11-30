import { registerSchema, loginSchema } from "generated/validationSchemas/auth";
import { tWithCustomNamespace } from "lib/i18n";
import * as Yup from "yup";

export const registerFormSchema = (t: (key: string) => string) =>
  registerSchema(tWithCustomNamespace(t, "server")).shape({
    repeatPassword: Yup.string()
      .required(t("register.passwordRequired"))
      .oneOf(
        // TODO: When unit tests are in place try to figure a way to avoid the null assertion
        /* eslint @typescript-eslint/no-non-null-assertion: "off" */
        [Yup.ref("password"), null!] as const,
        t("register.passwordsMustMatch")
      ),

    acceptTerms: Yup.boolean().oneOf(
      [true],
      t("register.mustAcceptTermsAndConditions")
    )
  });

export const loginFormSchema = (t: (key: string) => string) =>
  loginSchema(tWithCustomNamespace(t, "server")).shape({
    rememberMe: Yup.boolean()
  });
