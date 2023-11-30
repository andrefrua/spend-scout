import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Row } from "react-table";

import DataTable from "components/DataTable";
import useCategoriesApi from "hooks/useCategoriesApi";
import { Category } from "generated/models/category";

import { getCategoryDataTableColumns } from "./Categories.utils";

const Categories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, deleteCategory, error } = useCategoriesApi();

  const categoryDataTableColumns = useMemo(
    () => getCategoryDataTableColumns(t),
    [t]
  );

  // TODO: Need to show errors in a better way
  if (error) {
    return <div>{error}ERROR</div>;
  }

  const addCategoryHandler = () => navigate("/categories/create");

  const editCategoryHandler = (row: Row<Category>) =>
    navigate(`/categories/edit/${row.original.id}`);

  const deleteCategoryHandler = async (row: Row<Category>) => {
    if (row.original.id) {
      await deleteCategory(row.original.id);
    }
  };

  return (
    <DataTable
      isLoading={isLoading}
      title={t("categories.categories") || ""}
      subTitle={t("categories.categoriesListDescription") || ""}
      table={{ columns: categoryDataTableColumns, rows: data }}
      onAdd={addCategoryHandler}
      onEdit={editCategoryHandler}
      onDelete={deleteCategoryHandler}
    />
  );
};

export default Categories;
