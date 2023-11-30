import CustomInput from "components/mui/CustomInput";

import { FormFieldProps } from "./FormField.models";

const FormField = ({ label = " ", ...others }: FormFieldProps): JSX.Element => {
  return (
    <CustomInput
      variant="standard"
      label={label}
      fullWidth
      InputLabelProps={{ shrink: true }}
      {...others}
    />
  );
};

export default FormField;
