import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Category } from "generated/models/category";
import { useAuthContext } from "context/AuthProvider";

import useApi from "./useApi";
import useCustomSnackbar from "./useCustomSnackbar";

const useCategoriesApi = () => {
  const {
    state: { token }
  } = useAuthContext();

  const { get, post, put, remove } = useApi({ token });
  const { t } = useTranslation();
  const { showSnackbarSuccess } = useCustomSnackbar();

  const [data, setData] = useState<Category[]>([]); // Category array
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);

      const categories = await get("/category");

      setData(categories);
    } catch (catchError) {
      setError((catchError as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [get]);

  const fetchCategoryById = useCallback(
    async (categoryId: string): Promise<Category | null> => {
      try {
        setIsLoading(true);

        const category = await get(`/category/${categoryId}`);

        return category;
      } catch (catchError) {
        setError((catchError as Error).message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [get]
  );

  const createCategory = useCallback(
    async (category: Category) => {
      try {
        setIsLoading(true);

        const newCategory = await post("/category", category);

        setData(prevData => [...prevData, newCategory]);

        showSnackbarSuccess(
          t("categories.categoryCreatedSuccessfully"),
          t("categories.categories")
        );
        console.info(t("categories.categoryCreatedSuccessfully"));

        return newCategory;
      } catch (catchedError) {
        setError((catchedError as Error).message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [post, t, showSnackbarSuccess]
  );

  const updateCategory = useCallback(
    async (categoryId: string, category: Category) => {
      try {
        setIsLoading(true);

        const updatedCategory = await put(`/category/${categoryId}`, category);

        setData(prevData =>
          prevData.map(auxCategory =>
            auxCategory.id === categoryId
              ? { ...auxCategory, ...updatedCategory }
              : auxCategory
          )
        );

        showSnackbarSuccess(
          t("categories.categoryUpdatedSuccessfully"),
          t("categories.categories")
        );
        console.info(t("categories.categoryUpdatedSuccessfully"));

        return updatedCategory;
      } catch (catchedError) {
        setError((catchedError as Error).message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [put, t, showSnackbarSuccess]
  );

  const deleteCategory = useCallback(
    async (categoryId: string) => {
      try {
        setIsLoading(true);

        await remove(`/category/${categoryId}`);

        setData(prevData =>
          prevData.filter(category => category.id !== categoryId)
        );

        showSnackbarSuccess(
          t("categories.categoryDeletedSuccessfully"),
          t("categories.categories")
        );
        console.info(t("categories.categoryDeletedSuccessfully"));

        return true;
      } catch (catchedError) {
        setError((catchedError as Error).message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [remove, t, showSnackbarSuccess]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    data,
    isLoading,
    error,
    fetchCategories,
    fetchCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
  };
};

export default useCategoriesApi;
