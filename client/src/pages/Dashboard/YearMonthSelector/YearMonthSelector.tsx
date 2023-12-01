import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import CustomBox from "components/mui/CustomBox";

import {
  MonthOptions,
  YearMonthSelectorProps
} from "./YearMonthSelector.models";
import { getLastXYears, getMonthOptions } from "./YearMonthSelector.utils";

const YearMonthSelector = ({
  selectedDate,
  onDateChange
}: YearMonthSelectorProps) => {
  const { i18n, t } = useTranslation();

  const years = getLastXYears(10);
  const monthOptions = getMonthOptions(i18n.language);

  const yearChangeHandler = (
    event: SyntheticEvent<Element, Event>,
    newYear: number | null
  ) => {
    if (newYear !== null) {
      onDateChange?.(new Date(newYear, selectedDate.getMonth(), 15));
    }
  };

  const monthChangeHandler = (
    event: SyntheticEvent<Element, Event>,
    newMonth: MonthOptions | null
  ) => {
    if (newMonth !== null) {
      onDateChange?.(
        new Date(selectedDate.getFullYear(), newMonth.monthNumber - 1, 15)
      );
    }
  };

  return (
    <Card>
      <CustomBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Autocomplete
              value={selectedDate.getFullYear()}
              onChange={yearChangeHandler}
              options={years}
              getOptionLabel={option => option.toString()} // Convert the year to a string
              renderInput={params => (
                <TextField
                  {...params}
                  label={t("yearMonthSelector.selectYear")}
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              value={
                monthOptions.find(
                  option => option.monthNumber === selectedDate.getMonth() + 1
                ) || null
              }
              onChange={monthChangeHandler}
              options={monthOptions}
              getOptionLabel={option => option.label}
              renderInput={params => (
                <TextField
                  {...params}
                  label={t("yearMonthSelector.selectMonth")}
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>
      </CustomBox>
    </Card>
  );
};

export default YearMonthSelector;
