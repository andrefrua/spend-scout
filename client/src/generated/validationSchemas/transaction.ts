import * as Yup from "yup";

// Define the schema for validating category data
export const transactionSchema = (t: (key: string) => string) => {
  return Yup.object().shape({
    transactionDate: Yup.date().required(
      t("transactions.transactionDateRequired")
    ),
    valueDate: Yup.date().required(t("transactions.valueDateRequired")),
    description: Yup.string().required(t("transactions.descriptionRequired")),
    balance: Yup.number(),
    amount: Yup.number().required(t("transactions.amountRequired")),
    categoryId: Yup.string().required(t("transactions.categoryIdRequired"))
  });
};
