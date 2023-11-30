import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Icon } from "@mui/material";

import CustomInput from "components/mui/CustomInput";

import { CustomDatePickerProps } from "./CustomDatePicker.models";

const CustomDatePicker = ({
  input = {},
  onChange,
  ...others
}: CustomDatePickerProps): JSX.Element => {
  return (
    <Flatpickr
      {...others}
      onChange={onChange}
      render={({ defaultValue }: any, ref: any) => (
        <CustomInput
          {...input}
          defaultValue={defaultValue}
          inputRef={ref}
          InputProps={{
            endAdornment: <Icon color="info">edit_calendar</Icon>
          }}
        />
      )}
    />
  );
};

export default CustomDatePicker;
