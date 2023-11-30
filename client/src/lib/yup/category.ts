import { categorySchema } from "generated/validationSchemas/category";
import { tWithCustomNamespace } from "lib/i18n";

export const categoryFormSchema = (t: (key: string) => string) =>
  categorySchema(tWithCustomNamespace(t, "server"));
