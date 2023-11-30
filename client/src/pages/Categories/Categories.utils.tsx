import { Column } from "react-table";
import { TFunction } from "i18next";

import { Category } from "generated/models/category";

export const getCategoryDataTableColumns = (
  t: TFunction
): Column<Category>[] => [
  { Header: t("common.name") || "", accessor: "name", width: "20%" },
  {
    Header: t("common.description") || "",
    accessor: "description",
    width: "80%"
  }
];
