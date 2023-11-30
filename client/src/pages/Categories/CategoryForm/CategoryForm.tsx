import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DefaultFormik from "components/forms/DefaultFormik";

import useCategoriesApi from "hooks/useCategoriesApi";
import { Category, CategoryType } from "generated/models/category";
import { categoryFormSchema } from "lib/yup/category";

import BaseInfo from "./BaseInfo";
import {
  CategoryFormProps,
  EmbeddedCategoryFormProps
} from "./CategoryForm.models";

const CategoryForm = ({
  embeddedMode = false,
  onSubmit,
  onCancel
}: CategoryFormProps | EmbeddedCategoryFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const {
    error,
    isLoading,
    fetchCategoryById,
    createCategory,
    updateCategory
  } = useCategoriesApi();

  const [formData, setFormData] = useState<Category>({
    type: CategoryType.Expense,
    name: "",
    description: "",
    filterField: ""
  });

  // Fetch existing category data when editing and not in embedded mode
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (categoryId && !embeddedMode) {
        const category: Category | null = await fetchCategoryById(categoryId);

        if (category) {
          setFormData(category);
        }
      }
    };

    fetchCategoryData();
  }, [categoryId, fetchCategoryById, embeddedMode]);

  const saveCustomer = async (category: Category) => {
    let categoryApiResult;

    if (categoryId) {
      categoryApiResult = await updateCategory(categoryId, category);
    } else {
      categoryApiResult = await createCategory(category);
    }

    if (categoryApiResult) {
      navigate("/categories");
    }
  };

  const submitHandler = async (categoryData: Category) => {
    if (embeddedMode) {
      onSubmit?.(categoryData);
    } else {
      await saveCustomer({
        type: categoryData.type,
        name: categoryData.name,
        description: categoryData.description,
        filterField: categoryData.filterField
      });
    }
  };

  const cancelHandler = () => {
    if (embeddedMode) {
      onCancel?.();
    } else {
      navigate("/categories");
    }
  };

  return (
    <DefaultFormik
      initialValues={formData}
      validationSchema={useMemo(() => categoryFormSchema(t), [t])}
      onSubmit={submitHandler}
      onCancel={cancelHandler}
      title={t("categories.createCategory") || ""}
      description={t("categories.createNewCategory") || ""}
      error={error}
      isLoading={isLoading}>
      <BaseInfo />
    </DefaultFormik>
  );
};

export default CategoryForm;
