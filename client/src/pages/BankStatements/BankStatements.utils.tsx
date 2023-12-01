import { Column, Row } from "react-table";
import { TFunction } from "i18next";

import CustomTypography from "components/mui/CustomTypography";
import { Category } from "generated/models/category";
import { Transaction } from "generated/models/transaction";
import DataTableAutocomplete from "components/DataTable/cellComponents/DataTableAutocomplete";
import { formatDateString } from "lib/utils/formatDateString";
import { formatCurrencyString } from "lib/utils/formatCurrencyString";

import { BankStatement, SimplifiedTransaction } from "./BankStatements.models";

export const getBankStatementDataTableColumns = (
  t: TFunction,
  language: string,
  categories: Category[],
  bankStatementData: BankStatement[],
  setData: (value: BankStatement[]) => void
): Column<BankStatement>[] => [
  // {
  //   Header: t("transactions.transactionDate") || "",
  //   accessor: "transactionDate",
  //   width: "10%",
  //   Cell: ({ value }) => (
  //     <CustomTypography fontSize="default">
  //       {formatDateString(value, language)}
  //     </CustomTypography>
  //   )
  // },
  {
    Header: t("transactions.valueDate") || "",
    accessor: "valueDate",
    width: "10%",
    Cell: ({ value }) => (
      <CustomTypography fontSize="default" color="dark">
        {formatDateString(value, language)}
      </CustomTypography>
    )
  },
  {
    Header: t("transactions.description") || "",
    accessor: "description",
    width: "20%",
    Cell: ({ value }) => (
      <CustomTypography fontSize="default" color="dark">
        {value}
      </CustomTypography>
    )
  },
  {
    Header: t("transactions.amount") || "",
    accessor: "amount",
    width: "10%",
    Cell: ({ value }) => (
      <CustomTypography
        fontSize="default"
        fontWeight="medium"
        color={value < 0 ? "error" : "success"}>
        {formatCurrencyString(value, language)}
      </CustomTypography>
    )
  },
  // {
  //   Header: t("transactions.balance") || "",
  //   accessor: "balance",
  //   width: "10%",
  //   Cell: ({ value }) => (
  //     <CustomTypography
  //       fontSize="default"
  //       fontWeight="medium"
  //       color={value < 0 ? "error" : "success"}>
  //       {formatCurrencyString(value, language)}
  //     </CustomTypography>
  //   )
  // },
  {
    Header: t("transactions.category") || "",
    accessor: "categoryId",
    width: "40%",
    Cell: ({ row }) => {
      return (
        <DataTableAutocomplete
          options={categories}
          optionIdentifier="id"
          optionLabel="name"
          selectedOption={row.values.categoryId}
          onChange={(_, newValue) => {
            if (newValue) {
              const updatedData = [...bankStatementData];
              updatedData[row.index].categoryId = newValue.id;
              updatedData[row.index].accepted = true;
              setData(updatedData);
            }
          }}
        />
      );
    }
  }
];

export const columnIndexMapping = [
  "transactionDate",
  "valueDate",
  "description",
  "amount",
  "balance",
  "categoryId"
];

export const getRowProps = (row: Row<BankStatement>) => {
  const acceptedColor = "#CCFFCC";
  const duplicatedColor = "#ADD8E6";
  const notAcceptedColor = "#FFD1DC";

  const accepted = row?.original?.accepted ? acceptedColor : notAcceptedColor;

  return {
    style: {
      backgroundColor: row?.original?.duplicated ? duplicatedColor : accepted
    }
  };
};

export const simplifyTransaction = (
  originalObj: Transaction | BankStatement | SimplifiedTransaction,
  includeCategory: boolean
): SimplifiedTransaction => {
  const simplifiedTransaction: SimplifiedTransaction = {
    transactionDate: new Date(originalObj.transactionDate)
      .toISOString()
      .split("T")[0],
    valueDate: new Date(originalObj.valueDate).toISOString().split("T")[0],
    description: originalObj.description,
    balance: Number(originalObj.balance),
    amount: Number(originalObj.amount)
  };

  if (includeCategory) {
    simplifiedTransaction.categoryId = originalObj.categoryId;
  }
  return simplifiedTransaction;
};

export const isTransactionAlreadySaved = (
  transactions: Transaction[],
  transactionToCheck: Transaction | BankStatement | SimplifiedTransaction,
  includeCategory: boolean
): boolean => {
  // Creates an array with simplified transactions (only properties to compare)
  const savedSimplifiedTransactions = transactions.map(transaction =>
    simplifyTransaction(transaction, includeCategory)
  );

  // Converts the objects into a JSON string in order to easily compare them
  const savedSimplifiedTransactionsSet = new Set(
    savedSimplifiedTransactions.map(savedSimplifiedTransaction =>
      JSON.stringify(savedSimplifiedTransaction)
    )
  );

  const simplifiedTransactionToCheckString = JSON.stringify(
    simplifyTransaction(transactionToCheck, includeCategory)
  );

  return savedSimplifiedTransactionsSet.has(simplifiedTransactionToCheckString);
};
