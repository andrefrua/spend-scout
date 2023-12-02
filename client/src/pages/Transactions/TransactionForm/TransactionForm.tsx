import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DefaultFormik from "components/forms/DefaultFormik";

import useTransactionsApi from "hooks/useTransactionsApi";
import { Transaction } from "generated/models/transaction";
import { transactionFormSchema } from "lib/yup/transaction";

import BaseInfo from "./BaseInfo";
import { TransactionFormProps } from "./TransactionForm.models";

const TransactionForm = ({
  embeddedMode = false,
  onSubmit,
  onCancel
}: TransactionFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const {
    error,
    isLoading,
    fetchTransactionById,
    createTransaction,
    updateTransaction
  } = useTransactionsApi();

  const [formData, setFormData] = useState<Transaction>({
    transactionDate: new Date().toISOString().split("T")[0],
    valueDate: new Date().toISOString().split("T")[0],
    description: "",
    balance: 0,
    amount: 0,
    categoryId: ""
  });

  // TODO: REmove embeddedMode
  // Fetch existing transaction data when editing and not in embedded mode
  useEffect(() => {
    const fetchTransactionData = async () => {
      if (transactionId && !embeddedMode) {
        const transaction: Transaction | null = await fetchTransactionById(
          transactionId
        );

        if (transaction) {
          setFormData(transaction);
        }
      }
    };

    fetchTransactionData();
  }, [transactionId, fetchTransactionById, embeddedMode]);

  const saveTransaction = async (transaction: Transaction) => {
    let transactionApiResult;

    if (transactionId) {
      transactionApiResult = await updateTransaction(
        transactionId,
        transaction
      );
    } else {
      transactionApiResult = await createTransaction(transaction);
    }

    if (transactionApiResult) {
      navigate("/transactions");
    }
  };

  const submitHandler = async (transactionData: Transaction) => {
    if (embeddedMode) {
      onSubmit?.(transactionData);
    } else {
      await saveTransaction(transactionData);
    }
  };

  const cancelHandler = () => {
    if (embeddedMode) {
      onCancel?.();
    } else {
      navigate("/transactions");
    }
  };

  return (
    <DefaultFormik
      initialValues={formData}
      validationSchema={useMemo(() => transactionFormSchema(t), [t])}
      onSubmit={submitHandler}
      onCancel={cancelHandler}
      title={t("transactions.createTransaction") || ""}
      description={t("transactions.createNewTransaction") || ""}
      error={error}
      isLoading={isLoading}>
      <BaseInfo />
    </DefaultFormik>
  );
};

export default TransactionForm;
