import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import DataTable from "components/DataTable";
import { TransactionByCategory } from "generated/models/dashboard";
import useDashboardApi from "hooks/useDashboardApi";
import { getTransactionDataTableColumns } from "pages/Transactions/Transactions.utils";
import useCategoriesApi from "hooks/useCategoriesApi";
import ActionBarButton from "components/ActionBar/ActionBarButton";

interface DetailsProps {
  onClose: () => void;
  transactionByCategory: TransactionByCategory;
  selectedDate: Date;
}

export const Details = ({
  onClose,
  transactionByCategory,
  selectedDate
}: DetailsProps) => {
  const { t, i18n } = useTranslation();
  const { fetchTransactionsByCategoryAndDate } = useDashboardApi();
  const { data: categoriesData } = useCategoriesApi();

  const transactionDataTableColumns = useMemo(
    () => getTransactionDataTableColumns(t, i18n.language, categoriesData),
    [t, i18n.language, categoriesData]
  );

  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const transactions = await fetchTransactionsByCategoryAndDate(
        selectedDate,
        transactionByCategory.categoryId
      );

      setTransactionsData(transactions);
    };

    fetch();
  }, [
    fetchTransactionsByCategoryAndDate,
    selectedDate,
    transactionByCategory.categoryId
  ]);

  const renderCustomActionBarButton = () => (
    <ActionBarButton icon="close" color="secondary" onClick={onClose}>
      {t("common.cancel")}
    </ActionBarButton>
  );

  return (
    <DataTable
      title={t("dashboard.transactionDetails") || ""}
      subTitle={t("dashboard.transactionDetailsBySelectedMonth") || ""}
      customActionBarButton={renderCustomActionBarButton()}
      table={{
        columns: transactionDataTableColumns,
        rows: transactionsData || []
      }}
    />
  );
};

export default Details;
