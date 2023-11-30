import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Row } from "react-table";

import DataTable from "components/DataTable";
import useTransactionsApi from "hooks/useTransactionsApi";
import useCategoriesApi from "hooks/useCategoriesApi";
import { Transaction } from "generated/models/transaction";

import { getTransactionDataTableColumns } from "./Transactions.utils";

const Transactions = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    data: transactionsData,
    isLoading,
    error,
    deleteTransaction
  } = useTransactionsApi();
  const { data: categoriesData } = useCategoriesApi();

  const transactionDataTableColumns = useMemo(
    () => getTransactionDataTableColumns(t, i18n.language, categoriesData),
    [t, i18n.language, categoriesData]
  );

  // TODO: Need to show errors in a better way
  if (error) {
    return <div>{error}ERROR</div>;
  }

  const addTransactionHandler = () => navigate("/transactions/create");

  const editTransactionHandler = (row: Row<Transaction>) =>
    navigate(`/transactions/edit/${row.original.id}`);

  const deleteTransactionHandler = async (row: Row<Transaction>) => {
    if (row.original.id) {
      await deleteTransaction(row.original.id);
    }
  };

  return (
    <DataTable
      isLoading={isLoading}
      title={t("transactions.transactions") || ""}
      subTitle={t("transactions.transactionsListDescription") || ""}
      table={{
        columns: transactionDataTableColumns,
        rows: transactionsData
      }}
      onAdd={addTransactionHandler}
      onEdit={editTransactionHandler}
      onDelete={deleteTransactionHandler}
    />
  );
};

export default Transactions;
