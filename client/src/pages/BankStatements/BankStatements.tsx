import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Row } from "react-table";

import { Card, Grid, Icon, Checkbox, Stack } from "@mui/material";

import CustomBox from "components/mui/CustomBox";
import CustomInput from "components/mui/CustomInput";
import CustomTypography from "components/mui/CustomTypography";
import CustomButton from "components/mui/CustomButton";

import DataTable from "components/DataTable";
import { parseNumericValue } from "lib/utils/parseNumericValues";
import { parseDateValueString } from "lib/utils/parseDateValueString";
import useCategoriesApi from "hooks/useCategoriesApi";
import useTransactionsApi from "hooks/useTransactionsApi";
import { Transaction } from "generated/models/transaction";
import { Category } from "generated/models/category";

import {
  columnIndexMapping,
  getBankStatementDataTableColumns
} from "./BankStatements.utils";
import { BankStatement, SimplifiedTransaction } from "./BankStatements.models";
import CategoryModal from "./CategoryModal";

const BankStatements = () => {
  const { t, i18n } = useTranslation();

  // Fetch categories from the database using the useCategoriesApi hook
  const {
    data: categoriesData,
    createCategory,
    fetchCategories
  } = useCategoriesApi();
  const { data: transactionsData, createBulkTransactions } =
    useTransactionsApi();
  const [firstRowHasHeaders, setFirstRowHasHeaders] = useState(true);
  const [bankStatementsData, setBankStatementsData] = useState<BankStatement[]>(
    []
  );
  const [isCategoryFormModalOpen, setIsCategoryFormModalOpen] = useState(false);

  const getRowProps = (row: Row<BankStatement>) => {
    return {
      style: {
        backgroundColor: row?.original?.accepted ? "#CCFFCC" : "#FFD1DC"
      }
    };
  };

  const bankStatementDataTableColumns = useMemo(
    () =>
      getBankStatementDataTableColumns(
        t,
        i18n.language,
        categoriesData,
        bankStatementsData,
        setBankStatementsData
      ),
    [t, i18n.language, categoriesData, bankStatementsData]
  );

  const convertImportedData = (importedData: string) => {
    // Excel sheets lines are separated by \n so we need to split the data
    const excelRows: string[] = importedData.split("\n");

    // We need to remove the first row because it contains the headers
    if (firstRowHasHeaders) {
      excelRows.shift();
    }

    // Check if the last row is empty and remove it if it is
    if (excelRows[excelRows.length - 1] === "") {
      excelRows.pop();
    }

    if (excelRows.length > 0) {
      // TODO: Check if there are more than 1000 records, and if so show a warning
      const convertedRows = excelRows.map((excelRow: string) => {
        // Split the row into cells
        const excelRowCell = excelRow.split("\t");

        const convertedRow: Partial<BankStatement> = {};

        Object.values(columnIndexMapping).forEach((accessor: string, index) => {
          if (accessor) {
            switch (accessor) {
              case "balance":
              case "amount":
                convertedRow[accessor] = parseNumericValue(excelRowCell[index]);
                break;
              case "transactionDate":
              case "valueDate":
                convertedRow[accessor] = parseDateValueString(
                  excelRowCell[index]
                );
                break;
              case "description":
              case "categoryId":
                convertedRow[accessor] = excelRowCell[index];
                break;
              case "accepted":
                // Sets the default value to false
                convertedRow[accessor] = false;
                break;
              default:
                console.info("Unknown accessor: ", accessor);
                break;
            }
          }
        });

        // Check if "description" matches any category's "filterField"
        const matchingCategory = categoriesData.find(
          category =>
            category?.filterField &&
            convertedRow?.description &&
            convertedRow.description.includes(category.filterField)
        );

        if (matchingCategory) {
          // Set Categoria to the matching category name
          convertedRow.categoryId = matchingCategory.id;
          convertedRow.accepted = true;
        }

        return { ...convertedRow } as BankStatement;
      });

      setBankStatementsData(convertedRows);
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    convertImportedData(event.target.value);
  };

  const isSaveButtonEnabled = () => {
    const acceptedRows = bankStatementsData.filter(row => row.accepted);
    return (
      acceptedRows.length > 0 &&
      acceptedRows.every(row => row.categoryId !== undefined)
    );
  };

  const transformObject = (
    originalObj: Transaction | BankStatement
  ): SimplifiedTransaction => ({
    transactionDate: new Date(originalObj.transactionDate)
      .toISOString()
      .split("T")[0],
    valueDate: new Date(originalObj.valueDate).toISOString().split("T")[0],
    description: originalObj.description,
    balance: Number(originalObj.balance),
    amount: Number(originalObj.amount),
    categoryId: originalObj.categoryId
  });

  const saveTransactionsHandler = async () => {
    // Filters the bank statements that were accepted and have a category
    const acceptedbankStatements = bankStatementsData
      .filter(
        bankStatement =>
          bankStatement.accepted && bankStatement.categoryId !== undefined
      )
      .map(bankStatement => transformObject(bankStatement));

    // Created an array with the transaction with only properties to compare
    const savedTransactions = transactionsData.map(transaction =>
      transformObject(transaction)
    );

    // Create a Set of saved transactions using JSON strings
    const savedTransactionsSet = new Set(
      savedTransactions.map(obj => JSON.stringify(obj))
    );

    const bankStatementsToSave: SimplifiedTransaction[] = [];

    acceptedbankStatements.forEach(bankStatement => {
      const bankStatementString = JSON.stringify(bankStatement);

      if (savedTransactionsSet.has(bankStatementString)) {
        // Ask the user for confirmation
        const confirmMessage = t("bankStatements.confirmRecordDuplication", {
          description: bankStatement.description,
          amount: bankStatement.amount
        });

        // TODO: This should be translated and may a better modal popup would be good!!
        if (!window.confirm(confirmMessage)) {
          return; // Skip this row
        }
      }

      bankStatementsToSave.push(bankStatement);
    });

    await createBulkTransactions(bankStatementsToSave);
  };

  const submitCategoryHandler = async (newCategory: Category) => {
    const responseApi = await createCategory(newCategory);

    if (responseApi) {
      await fetchCategories();
      setIsCategoryFormModalOpen(false);
    }
  };

  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={12}>
        <Card>
          <CustomBox p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CustomInput
                  type="text"
                  placeholder={
                    t("bankStatements.pasteTheBankStatementHere") || ""
                  }
                  variant="outlined"
                  fullWidth
                  multiline
                  value=""
                  onChange={changeHandler}
                  onKeyPress={(
                    event: React.KeyboardEvent<HTMLInputElement>
                  ) => {
                    event.preventDefault();
                  }}
                  InputProps={{
                    endAdornment: (
                      <Icon sx={{ px: 3 }} color="info">
                        content_paste
                      </Icon>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack
                  direction="row"
                  component="label"
                  alignItems="center"
                  justifyContent="left">
                  <Checkbox
                    checked={firstRowHasHeaders}
                    onChange={() => setFirstRowHasHeaders(!firstRowHasHeaders)}
                  />
                  <CustomTypography variant="h6">
                    {t("bankStatements.firstRowHasHeaders")}
                  </CustomTypography>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={2}>
                <CustomBox
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  px={{ xs: 2, sm: 0 }}>
                  <CustomButton
                    variant="gradient"
                    color="secondary"
                    onClick={() => setIsCategoryFormModalOpen(true)}>
                    {t("categories.createCategory")}
                  </CustomButton>
                </CustomBox>
              </Grid>
            </Grid>
          </CustomBox>

          {bankStatementsData.length > 0 && (
            <DataTable
              entriesPerPage={{
                defaultValue: "1000",
                entries: ["1000"],
                canChange: false
              }}
              title={t("bankStatements.bankStatementData") || ""}
              subTitle={
                t("bankStatements.bankStatementDataImportedFromExcel") || ""
              }
              table={{
                columns: bankStatementDataTableColumns,
                rows: bankStatementsData
              }}
              onAdd={saveTransactionsHandler}
              labels={{
                addButton: t("common.save") || ""
              }}
              isAddButtonDisabled={!isSaveButtonEnabled()}
              onSelect={row => {
                const newData = bankStatementsData.map((auxRow, index) => {
                  if (row.index === index && auxRow.categoryId) {
                    return { ...auxRow, accepted: true };
                  }
                  return auxRow;
                });

                setBankStatementsData(newData);
              }}
              onDelete={row => {
                const newData = bankStatementsData.map((auxRow, index) => {
                  if (row.index === index) {
                    return { ...auxRow, accepted: false };
                  }
                  return auxRow;
                });

                setBankStatementsData(newData);
              }}
              getRowProps={getRowProps}
            />
          )}
        </Card>
      </Grid>

      <CategoryModal
        open={isCategoryFormModalOpen}
        onSubmit={submitCategoryHandler}
        onClose={(reason: string) => {
          if (reason !== "backdropClick") {
            // We only want to close the modal when actually clicking the close or submit button.
            setIsCategoryFormModalOpen(false);
          }
        }}
      />
    </Grid>
  );
};

export default BankStatements;
