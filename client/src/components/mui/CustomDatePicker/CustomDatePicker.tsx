import dayjs from "dayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import CustomPickersLayout from "./CustomPickersLayout";
import { CustomDatePickerProps } from "./CustomDatePicker.models";

const CustomDatePicker = ({
  input = {},
  ...others
}: CustomDatePickerProps): JSX.Element => {
  // We need to remove the value from the remaining props because the value must be formatted using dayjs
  const { value, ...otherProps } = others;

  return (
    <DatePicker
      {...otherProps}
      value={dayjs(others.value)}
      label={others.label}
      slots={{
        layout: CustomPickersLayout
      }}
      slotProps={{
        textField: {
          ...input
        }
      }}
    />
  );
};

export default CustomDatePicker;
