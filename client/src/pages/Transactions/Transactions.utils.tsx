import { Column } from "react-table";
import { TFunction } from "i18next";

import { Transaction } from "generated/models/transaction";
import { Category } from "generated/models/category";
import { formatDateString } from "lib/utils/formatDateString";
import { formatCurrencyString } from "lib/utils/formatCurrencyString";
import CustomTypography from "components/mui/CustomTypography";

export const getTransactionDataTableColumns = (
  t: TFunction,
  language: string,
  categories: Category[]
): Column<Transaction>[] => [
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
    width: "30%"
  },
  {
    Header: t("transactions.category") || "",
    accessor: "categoryId",
    width: "30%",
    Cell: ({ value }) => {
      const foundCategory = categories.find(category => category.id === value);

      return (
        <CustomTypography fontSize="default">
          {foundCategory?.name}
        </CustomTypography>
      );
    }
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
  }
];
