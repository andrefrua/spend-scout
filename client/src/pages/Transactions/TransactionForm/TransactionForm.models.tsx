import { Transaction } from "generated/models/transaction";

export interface TransactionFormProps {
  embeddedMode?: false;
  onSubmit?: (transactionData: Transaction) => void;
  onCancel?: () => void;
}
