import * as Yup from "yup";

// Define the schema for validating category data
export const categorySchema = (t: (key: string) => string) => {
  return Yup.object().shape({
    type: Yup.string().required(t("categories.typeRequired")),
    name: Yup.string().required(t("categories.nameRequired")),
    description: Yup.string(),
    filterField: Yup.string()
  });
};
