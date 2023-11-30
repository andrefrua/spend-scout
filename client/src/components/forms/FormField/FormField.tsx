import { ErrorMessage, Field } from "formik";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";
import CustomInput from "components/mui/CustomInput";

import { FormFieldProps } from "./FormField.models";

const FormField = ({
  name,
  as,
  children,
  ...others
}: FormFieldProps): JSX.Element => {
  return (
    <CustomBox mb={1.5}>
      <Field
        {...others}
        name={name}
        as={as || CustomInput}
        variant="standard"
        {...(as === undefined ? { fullWidth: true } : {})}
      />
      {children}
      <CustomBox mt={0.75}>
        <CustomTypography
          component="div"
          variant="caption"
          color="error"
          fontWeight="regular">
          <ErrorMessage name={name} />
        </CustomTypography>
      </CustomBox>
    </CustomBox>
  );
};

export default FormField;
