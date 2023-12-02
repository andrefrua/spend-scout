import dayjs from "dayjs";

import { DateTimePicker } from "@mui/x-date-pickers";

import CustomPickersLayout from "../CustomDatePicker/CustomPickersLayout";
import { CustomDateTimePickerProps } from "./CustomDateTimePicker.models";

const CustomDateTimePicker = ({
  input = {},
  ...others
}: CustomDateTimePickerProps): JSX.Element => {
  // We need to remove the value from the remaining props because the value must be formatted using dayjs
  const { value, ...otherProps } = others;

  return (
    <DateTimePicker
      {...otherProps}
      value={dayjs(others.value)}
      label={others.label}
      slots={{ layout: CustomPickersLayout }}
      slotProps={{
        textField: {
          ...input
        }
      }}
    />
  );
};

export default CustomDateTimePicker;
