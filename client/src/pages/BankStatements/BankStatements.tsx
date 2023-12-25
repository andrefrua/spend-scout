import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Row } from "react-table";

import { Card, Grid, Icon, Checkbox, Stack } from "@mui/material";

import CustomBox from "components/mui/CustomBox";
import CustomInput from "components/mui/CustomInput";
import CustomTypography from "components/mui/CustomTypography";
import CustomButton from "components/mui/CustomButton";

import DataTable from "components/DataTable";
import ActionBarButton from "components/ActionBar/ActionBarButton";
import { parseNumericValue } from "lib/utils/parseNumericValues";
import { parseDateValueString } from "lib/utils/parseDateValueString";
import useCategoriesApi from "hooks/useCategoriesApi";
import useTransactionsApi from "hooks/useTransactionsApi";
import { Transaction } from "generated/models/transaction";
import { Category } from "generated/models/category";
import useBlockNavigationPrompt from "hooks/useBlockNavigationPrompt";

import {
  columnIndexMapping,
  getBankStatementDataTableColumns,
  getRowProps,
  isTransactionAlreadySaved,
  simplifyTransaction
} from "./BankStatements.utils";
import { BankStatement, SimplifiedTransaction } from "./BankStatements.models";
import CategoryModal from "./CategoryModal";
import Legend from "./Legend";
import CustomRowActions from "./CustomRowActions";
import ObservationsModal from "./ObservationsModal";

const BankStatements = () => {
  const { t, i18n } = useTranslation();
  const { setShouldBlock } = useBlockNavigationPrompt();

  const {
    data: categoriesData,
    createCategory,
    fetchCategories
  } = useCategoriesApi();
  const {
    data: transactionsData,
    createBulkTransactions,
    fetchTransactions
  } = useTransactionsApi();
  const [firstRowHasHeaders, setFirstRowHasHeaders] = useState(true);
  const [bankStatementsData, setBankStatementsData] = useState<BankStatement[]>(
    []
  );
  const [isCategoryFormModalOpen, setIsCategoryFormModalOpen] = useState(false);
  const [isObservationsModalOpen, setIsObservationsModalOpen] = useState(false);
  const [editingObservationRow, setEditingObservationRow] =
    useState<Row<BankStatement> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

        convertedRow.duplicated = isTransactionAlreadySaved(
          transactionsData,
          convertedRow as BankStatement,
          false
        );

        if (matchingCategory) {
          // Set Categoria to the matching category name
          convertedRow.categoryId = matchingCategory.id;
          convertedRow.accepted = !convertedRow.duplicated; // We only want to accept the row if it's not duplicated
        }

        convertedRow.observations = "";

        return { ...convertedRow } as BankStatement;
      });

      setBankStatementsData(convertedRows);

      setTimeout(() => setShouldBlock(!isSubmitting), 0);
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

  const saveTransactionsHandler = async () => {
    setIsSubmitting(true);
    setShouldBlock(false);

    // Filters the bank statements that were accepted and have a category
    const acceptedbankStatements = bankStatementsData
      .filter(
        bankStatement =>
          bankStatement.accepted && bankStatement.categoryId !== undefined
      )
      .map(bankStatement => simplifyTransaction(bankStatement, true));

    const bankStatementsToSave: SimplifiedTransaction[] = [];

    acceptedbankStatements.forEach(bankStatement => {
      if (isTransactionAlreadySaved(transactionsData, bankStatement, true)) {
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

    await createBulkTransactions(bankStatementsToSave as Transaction[]);
    await fetchTransactions();
    setBankStatementsData([]);
    setIsSubmitting(false);
  };

  const submitCategoryHandler = async (newCategory: Category) => {
    const responseApi = await createCategory(newCategory);

    if (responseApi) {
      await fetchCategories();
      setIsCategoryFormModalOpen(false);
    }
  };

  const submitObservationsHandler = async ({
    observations
  }: {
    observations: string;
  }) => {
    const newData = bankStatementsData.map((auxRow, index) => {
      if (editingObservationRow?.index === index) {
        return { ...auxRow, observations };
      }
      return auxRow;
    });

    setEditingObservationRow(null);
    setIsObservationsModalOpen(false);
    setBankStatementsData(newData);
  };

  const renderCustomActionBarButton = () => (
    <ActionBarButton
      icon="save"
      color="success"
      onClick={saveTransactionsHandler}
      disabled={!isSaveButtonEnabled()}>
      {t("common.save")}
    </ActionBarButton>
  );

  const renderCustomRowActions = (row: Row<BankStatement>) => {
    return (
      <CustomRowActions
        onClick={() => {
          setEditingObservationRow(row);
          setIsObservationsModalOpen(true);
        }}
        icon={row.original.observations === "" ? "add_comment" : "comment"}
        title={
          row.original.observations === ""
            ? t("bankStatements.addComment")
            : t("bankStatements.editComment")
        }
      />
    );
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
                  flexDirection={{ xs: "column", sm: "row" }}>
                  <CustomButton
                    sx={{
                      ml: { xs: 2, sm: 1 },
                      mt: { xs: 1, sm: 0 },
                      mb: { xs: 1, sm: 0 }
                    }}
                    variant="outlined"
                    color="success"
                    onClick={() => setIsCategoryFormModalOpen(true)}>
                    <Icon sx={{ mr: 0.5 }}>add</Icon>
                    {t("categories.createCategory")}
                  </CustomButton>
                </CustomBox>
              </Grid>
            </Grid>
          </CustomBox>

          {bankStatementsData.length > 0 && (
            <>
              <Legend />
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
                customActionBarButton={renderCustomActionBarButton()}
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
                customRowActions={renderCustomRowActions}
              />
            </>
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

      <ObservationsModal
        open={isObservationsModalOpen}
        observations={editingObservationRow?.original.observations || ""}
        onSubmit={submitObservationsHandler}
        onClose={(reason: string) => {
          if (reason !== "backdropClick") {
            // We only want to close the modal when actually clicking the close or submit button.
            setIsObservationsModalOpen(false);
          }
        }}
      />
    </Grid>
  );
};

export default BankStatements;
