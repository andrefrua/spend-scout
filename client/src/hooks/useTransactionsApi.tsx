import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Transaction } from "generated/models/transaction";
import { useAuthContext } from "context/AuthProvider";
import useApi from "./useApi";
import useCustomSnackbar from "./useCustomSnackbar";

const useTransactionsApi = () => {
  const {
    state: { token }
  } = useAuthContext();
  const { get, post, put, remove } = useApi({ token });
  const { t } = useTranslation();
  const { showSnackbarSuccess } = useCustomSnackbar();

  const [data, setData] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setIsLoading(true);

      const transactions = await get("/transaction");

      setData(transactions);
    } catch (catchError) {
      setError((catchError as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [get]);

  const fetchTransactionById = useCallback(
    async (transactionId: string): Promise<Transaction | null> => {
      try {
        setIsLoading(true);

        const transaction = await get(`/transaction/${transactionId}`);

        return transaction;
      } catch (catchError) {
        setError((catchError as Error).message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [get]
  );

  const createTransaction = useCallback(
    async (transaction: Transaction) => {
      try {
        setIsLoading(true);

        const newTransaction = await post("/transaction", transaction);

        setData(prevData => [...prevData, newTransaction]);

        showSnackbarSuccess(
          t("transactions.transactionCreatedSuccessfully"),
          t("transactions.transactions")
        );
        console.info(t("transactions.transactionCreatedSuccessfully"));

        return newTransaction;
      } catch (catchedError) {
        setError((catchedError as Error).message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [post, t, showSnackbarSuccess]
  );

  const updateTransaction = useCallback(
    async (transactionId: string, transaction: Transaction) => {
      try {
        setIsLoading(true);

        const updatedTransaction = await put(
          `/transaction/${transactionId}`,
          transaction
        );

        setData(prevData =>
          prevData.map(auxTransaction =>
            auxTransaction.id === transactionId
              ? { ...auxTransaction, ...updatedTransaction }
              : auxTransaction
          )
        );

        showSnackbarSuccess(
          t("transactions.transactionUpdatedSuccessfully"),
          t("transactions.transactions")
        );
        console.info(t("transactions.transactionUpdatedSuccessfully"));

        return updatedTransaction;
      } catch (catchedError) {
        setError((catchedError as Error).message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [put, t, showSnackbarSuccess]
  );

  const deleteTransaction = useCallback(
    async (transactionId: string) => {
      try {
        setIsLoading(true);

        await remove(`/transaction/${transactionId}`);

        setData(prevData =>
          prevData.filter(transaction => transaction.id !== transactionId)
        );

        showSnackbarSuccess(
          t("transactions.transactionDeletedSuccessfully"),
          t("transactions.transactions")
        );
        console.info(t("transactions.transactionDeletedSuccessfully"));

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

  const createBulkTransactions = useCallback(
    async (transactions: Transaction[]) => {
      try {
        setIsLoading(true);

        const response = await post("/transaction/bulk", {
          transactions
        });

        if (response?.createdTransactionIds.length > 0) {
          showSnackbarSuccess(
            t("transactions.transactionsCreatedSuccessfully"),
            t("transactions.transactions")
          );
          console.info(t("transactions.transactionsCreatedSuccessfully"));
        }
        return response?.createdTransactionIds;
      } catch (catchedError) {
        setError((catchedError as Error).message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [post, t, showSnackbarSuccess]
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    data,
    isLoading,
    error,
    fetchTransactions,
    fetchTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    createBulkTransactions
  };
};

export default useTransactionsApi;
