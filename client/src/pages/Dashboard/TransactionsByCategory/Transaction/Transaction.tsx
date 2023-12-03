import { useState } from "react";
import { useTranslation } from "react-i18next";

import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

import CustomTypography from "components/mui/CustomTypography";
import CustomBox from "components/mui/CustomBox";
import CustomButton from "components/mui/CustomButton";
import { formatCurrencyString } from "lib/utils/formatCurrencyString";

import { TransactionProps } from "./Transaction.models";
import DetailsModal from "./DetailsModal";

const Transaction = ({
  transactionByCategory,
  selectedDate
}: TransactionProps): JSX.Element => {
  const { t, i18n } = useTranslation();
  const { categoryName, categoryDescription, categoryMonthlyBudget, amount } =
    transactionByCategory;

  const [isDetailsFormModalOpen, setIsDetailsFormModalOpen] = useState(false);

  const isValueUnderMonthlyBudget = amount * -1 <= (categoryMonthlyBudget ?? 0);
  const isAmountPositive = amount > 0;

  const colorBudgetCheck = isValueUnderMonthlyBudget ? "success" : "error";
  const colorAmount = isAmountPositive ? "success" : "error";
  const icon = isValueUnderMonthlyBudget ? "check" : "close";
  const formattedMonthlyBudget = formatCurrencyString(
    categoryMonthlyBudget ?? 0,
    i18n.language
  );
  const tooltipTitle = isValueUnderMonthlyBudget
    ? t("transactions.youAreWithinYourMonthlyBudgetOf", {
        categoryMonthlyBudget: formattedMonthlyBudget
      })
    : t("transactions.youAreAboveYourMonthlyBudgetOf", {
        categoryMonthlyBudget: formattedMonthlyBudget
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
        <CustomBox display="flex" alignItems="center">
          <CustomTypography
            variant="button"
            color={colorAmount}
            fontWeight="medium">
            {formatCurrencyString(amount, i18n.language)}
          </CustomTypography>
          <Tooltip title={t("dashboard.details")} placement="right-end">
            <CustomButton
              sx={{ ml: 1 }}
              variant="outlined"
              color="info"
              iconOnly
              onClick={() => {
                setIsDetailsFormModalOpen(true);
              }}>
              <Icon>search</Icon>
            </CustomButton>
          </Tooltip>
        </CustomBox>
      </CustomBox>

      <DetailsModal
        open={isDetailsFormModalOpen}
        onClose={() => {
          setIsDetailsFormModalOpen(false);
        }}
        transactionByCategory={transactionByCategory}
        selectedDate={selectedDate}
      />
    </CustomBox>
  );
};

export default Transaction;
