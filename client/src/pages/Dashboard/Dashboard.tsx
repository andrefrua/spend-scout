import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";

import CustomBox from "components/mui/CustomBox";
import useDashboardApi from "hooks/useDashboardApi";
import { CategoryType } from "generated/models/category";
import { DashboardData } from "generated/models/dashboard";

import ComplexStatisticsCard from "./ComplexStatisticsCard";
import TransactionsByCategory from "./TransactionsByCategory";
import YearMonthSelector from "./YearMonthSelector";

const Dashboard = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<DashboardData | null>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { isLoading, error, fetchDashboard } = useDashboardApi();

  useEffect(() => {
    const fetch = async () => {
      const dashboard = await fetchDashboard(selectedDate);
      setData(dashboard);
    };

    fetch();
  }, [fetchDashboard, selectedDate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading || !data) {
    return null;
  }

  const dateChangeHandler = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <CustomBox mb={2}>
      <CustomBox>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CustomBox mb={3}>
              <YearMonthSelector
                selectedDate={selectedDate}
                onDateChange={dateChangeHandler}
              />
            </CustomBox>
          </Grid>
        </Grid>
      </CustomBox>
      <CustomBox mt={1.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <CustomBox mb={1.5}>
              <ComplexStatisticsCard
                icon="add"
                title={t("dashboard.totalIncome")}
                count={data.totalIncome.value}
                percentage={{
                  color:
                    data.totalIncome.previousMonthPercentageChange < 0
                      ? "error"
                      : "success",
                  amount: `${data.totalIncome.previousMonthPercentageChange.toFixed(
                    2
                  )}%`,
                  label: t("dashboard.thanLastMonth")
                }}
              />
            </CustomBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CustomBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="remove"
                title={t("dashboard.totalExpenses")}
                count={data.totalExpenses.value}
                percentage={{
                  color:
                    data.totalExpenses.previousMonthPercentageChange < 0
                      ? "error"
                      : "success",
                  amount: `${data.totalExpenses.previousMonthPercentageChange.toFixed(
                    2
                  )}%`,
                  label: t("dashboard.thanLastMonth")
                }}
              />
            </CustomBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CustomBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="thumb_up"
                title={t("dashboard.highestIncome")}
                count={data.highestIncomeTransaction.value}
                percentage={{
                  color:
                    data.highestIncomeTransaction
                      .previousMonthPercentageChange < 0
                      ? "error"
                      : "success",
                  amount: `${data.highestIncomeTransaction.previousMonthPercentageChange.toFixed(
                    2
                  )}%`,
                  label: t("dashboard.thanLastMonth")
                }}
              />
            </CustomBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CustomBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="thumb_down"
                title={t("dashboard.highestExpense")}
                count={data.highestExpenseTransaction.value}
                percentage={{
                  color:
                    data.highestExpenseTransaction
                      .previousMonthPercentageChange < 0
                      ? "error"
                      : "success",
                  amount: `${data.highestExpenseTransaction.previousMonthPercentageChange.toFixed(
                    2
                  )}%`,
                  label: t("dashboard.thanLastMonth")
                }}
              />
            </CustomBox>
          </Grid>
        </Grid>
      </CustomBox>
      <CustomBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TransactionsByCategory
              title={t("dashboard.expensesByCategory")}
              rows={data.expenseTransactionsByCategory}
              categoryType={CategoryType.Expense}
            />
          </Grid>
          <Grid item xs={6}>
            <TransactionsByCategory
              title={t("dashboard.incomeByCategory")}
              rows={data.incomeTransactionsByCategory}
              categoryType={CategoryType.Income}
            />
          </Grid>
        </Grid>
      </CustomBox>
    </CustomBox>
  );
};

export default Dashboard;
