import { FormikConfig } from "formik";

export interface DefaultFormikProps<T> extends FormikConfig<T> {
  onCancel?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title?: string;
  description?: string;
  error?: string | null;
  isLoading?: boolean;
  children: React.ReactNode;
}
