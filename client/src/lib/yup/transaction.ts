import { transactionSchema } from "generated/validationSchemas/transaction";
import { tWithCustomNamespace } from "lib/i18n";

export const transactionFormSchema = (t: (key: string) => string) =>
  transactionSchema(tWithCustomNamespace(t, "server"));
