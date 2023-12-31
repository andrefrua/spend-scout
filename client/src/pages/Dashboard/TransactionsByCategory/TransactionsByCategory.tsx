import { useTranslation } from "react-i18next";

import { Theme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import CustomTypography from "components/mui/CustomTypography";
import CustomBox from "components/mui/CustomBox";
import { CategoryType } from "generated/models/category";
import { useUIContext } from "context/UIProvider";

import Transaction from "./Transaction/Transaction";
import { TransactionsByCategoryProps } from "./TransactionsByCategory.models";

const TransactionsByCategory = ({
  title = "",
  rows = [],
  categoryType,
  selectedDate
}: TransactionsByCategoryProps): JSX.Element => {
  const { t } = useTranslation();
  const {
    state: { isDarkMode }
  } = useUIContext();

  return (
    <Card sx={{ height: "100%" }}>
      <CustomBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={3}
        px={2}>
        <CustomTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize">
          {title}
        </CustomTypography>
      </CustomBox>
      <CustomBox pt={3} pb={2} px={2}>
        {rows.length > 0 ? (
          <CustomBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
            sx={{ listStyle: "none" }}>
            {rows.map((row, index) => {
              const key = `${row.categoryName}-${index}`;
              return (
                <Transaction
                  key={key}
                  transactionByCategory={row}
                  selectedDate={selectedDate}
                />
              );
            })}
          </CustomBox>
        ) : (
          <CustomBox>
            <CustomBox p={2} mx={3} display="flex" justifyContent="center">
              <CustomBox
                display="grid"
                justifyContent="center"
                alignItems="center"
                // bgColor="white"
                sx={(theme: Theme) => {
                  const { palette } = theme;

                  return {
                    backgroundColor: isDarkMode
                      ? palette.light.secondary
                      : palette.dark.secondary
                  };
                }}
                color={
                  categoryType === CategoryType.Income ? "error" : "success"
                }
                variant="gradient">
                <Icon fontSize="large">
                  {categoryType === CategoryType.Income
                    ? "sentiment_dissatisfied"
                    : "sentiment_satisfied"}
                </Icon>
              </CustomBox>
            </CustomBox>
            <CustomBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
              <CustomTypography variant="h6" textTransform="capitalize">
                {categoryType === CategoryType.Income
                  ? t("dashboard.noIncomeYet")
                  : t("dashboard.noExpensesYet")}
              </CustomTypography>
            </CustomBox>
          </CustomBox>
        )}
      </CustomBox>
    </Card>
  );
};

export default TransactionsByCategory;
