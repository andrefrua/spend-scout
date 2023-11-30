import { t } from "i18next";
import { useFormikContext } from "formik";

import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import CustomBox from "components/mui/CustomBox";
import CustomDatePicker from "components/mui/CustomDatePicker";
import FormField from "components/forms/FormField";
import { Transaction } from "generated/models/transaction";
import useCategoriesApi from "hooks/useCategoriesApi";

const BaseInfo = (): JSX.Element => {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<Transaction>();
  const { data: categoriesData } = useCategoriesApi();

  return (
    <Grid item xs={12}>
      <Card sx={{ overflow: "visible" }}>
        <CustomBox p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                type="date"
                name="transactionDate"
                as={CustomDatePicker}
                label={t("transactions.transactionDate")}
                onChange={(date: Date, dateISO: string) => {
                  setFieldValue("transactionDate", dateISO);
                }}
                input={{
                  fullWidth: true,
                  variant: "standard",
                  label: t("transactions.transactionDate"),
                  error: errors.transactionDate && touched.transactionDate,
                  success: !errors.transactionDate && values.transactionDate
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormField
                type="date"
                name="valueDate"
                as={CustomDatePicker}
                label={t("transactions.valueDate")}
                onChange={(date: Date, dateISO: string) => {
                  setFieldValue("valueDate", dateISO);
                }}
                input={{
                  fullWidth: true,
                  variant: "standard",
                  label: t("transactions.valueDate"),
                  error: errors.valueDate && touched.valueDate,
                  success: !errors.valueDate && values.valueDate
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormField
                type="text"
                name="description"
                label={t("transactions.description")}
                error={errors.description && touched.description}
                success={!errors.description && values.description.length > 0}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormField
                type="number"
                name="balance"
                label={t("transactions.balance")}
                error={errors.balance && touched.balance}
                success={
                  !errors.balance && values.balance && values.balance > 0
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormField
                type="number"
                name="amount"
                label={t("transactions.amount")}
                error={errors.amount && touched.amount}
                success={!errors.amount && values.amount && values.amount > 0}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={categoriesData}
                getOptionLabel={option => option.name}
                value={
                  categoriesData.find(
                    category => category.id === values.categoryId
                  ) || null
                }
                onChange={(event, category) => {
                  if (category !== null) {
                    setFieldValue("categoryId", category.id);
                  }
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => (
                  <FormField
                    {...params}
                    type="text"
                    name="categoryId"
                    label={t("transactions.category")}
                    error={errors.categoryId && touched.categoryId}
                    success={
                      !errors.categoryId &&
                      values.categoryId &&
                      values.categoryId?.length > 0
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
        </CustomBox>
      </Card>
    </Grid>
  );
};

export default BaseInfo;
