import { t } from "i18next";
import { useFormikContext } from "formik";

import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import CustomBox from "components/mui/CustomBox";
import FormField from "components/forms/FormField";
import { Category, CategoryType } from "generated/models/category";

const BaseInfo = (): JSX.Element => {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<Category>();

  return (
    <Grid item xs={12}>
      <Card sx={{ overflow: "visible" }}>
        <CustomBox p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={Object.values(CategoryType)}
                getOptionLabel={type => {
                  if (type) {
                    return t(`categories.${type}`);
                  }

                  return "";
                }}
                value={values.type}
                onChange={(event, option) => {
                  if (option !== null) {
                    setFieldValue("type", option);
                  }
                }}
                isOptionEqualToValue={(option, value) => option === value}
                renderInput={params => (
                  <FormField
                    {...params}
                    type="text"
                    name="type"
                    label={t("categories.type")}
                    error={errors.type && touched.type}
                    success={
                      !errors.type && values.type && values.type?.length > 0
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormField
                type="text"
                name="name"
                label={t("common.name")}
                error={errors.name && touched.name}
                success={!errors.name && values.name.length > 0}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormField
                type="text"
                name="description"
                label={t("common.description")}
                error={errors.description && touched.description}
                success={!errors.description && values.description.length > 0}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormField
                type="text"
                name="filterField"
                label={t("categories.filterField")}
                error={errors.filterField && touched.filterField}
                success={!errors.filterField && values.filterField.length > 0}
              />
            </Grid>
          </Grid>
        </CustomBox>
      </Card>
    </Grid>
  );
};

export default BaseInfo;
