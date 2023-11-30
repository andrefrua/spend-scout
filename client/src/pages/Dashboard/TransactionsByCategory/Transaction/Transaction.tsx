import { useTranslation } from "react-i18next";

import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

import CustomTypography from "components/mui/CustomTypography";
import CustomBox from "components/mui/CustomBox";
import CustomButton from "components/mui/CustomButton";
import { TransactionProps } from "./Transaction.models";

const Transaction = ({
  transactionByCategory
}: TransactionProps): JSX.Element => {
  const { t } = useTranslation();
  const { categoryName, categoryDescription, categoryMonthlyBudget, amount } =
    transactionByCategory;

  const isValueUnderMonthlyBudget = amount * -1 <= (categoryMonthlyBudget ?? 0);
  const isAmountPositive = amount > 0;

  const colorBudgetCheck = isValueUnderMonthlyBudget ? "success" : "error";
  const colorAmount = isAmountPositive ? "success" : "error";
  const icon = isValueUnderMonthlyBudget ? "check" : "close";
  const tooltipTitle = isValueUnderMonthlyBudget
    ? t("transactions.youAreWithinYourMonthlyBudgetOf", {
        categoryMonthlyBudget
      })
    : t("transactions.youAreAboveYourMonthlyBudgetOf", {
        categoryMonthlyBudget
      });

  return (
    <CustomBox key={categoryName} component="li" py={1} pr={2} mb={1}>
      <CustomBox
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <CustomBox display="flex" alignItems="center">
          <CustomBox mr={2}>
            <Tooltip title={tooltipTitle}>
              <CustomButton
                variant="outlined"
                color={colorBudgetCheck}
                iconOnly
                circular>
                <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
              </CustomButton>
            </Tooltip>
          </CustomBox>
          <CustomBox display="flex" flexDirection="column">
            <CustomTypography variant="button" fontWeight="medium" gutterBottom>
              {categoryName}
            </CustomTypography>
            <CustomTypography
              variant="caption"
              color="text"
              fontWeight="regular">
              {categoryDescription}
            </CustomTypography>
          </CustomBox>
        </CustomBox>
        <CustomTypography
          variant="button"
          color={colorAmount}
          fontWeight="medium">
          {amount}
        </CustomTypography>
      </CustomBox>
    </CustomBox>
  );
};

export default Transaction;
