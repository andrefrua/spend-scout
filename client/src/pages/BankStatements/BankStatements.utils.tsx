import { Column } from "react-table";
import { TFunction } from "i18next";

import CustomTypography from "components/mui/CustomTypography";
import { Category } from "generated/models/category";
import DataTableAutocomplete from "components/DataTable/cellComponents/DataTableAutocomplete";
import { formatDateString } from "lib/utils/formatDateString";
import { formatCurrencyString } from "lib/utils/formatCurrencyString";

import { BankStatement } from "./BankStatements.models";

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
      <CustomTypography fontSize="default">
        {formatDateString(value, language)}
      </CustomTypography>
    )
  },
  {
    Header: t("transactions.description") || "",
    accessor: "description",
    width: "20%"
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
