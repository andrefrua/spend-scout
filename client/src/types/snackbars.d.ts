import { CustomSnackbarVariant } from "components/Snackbars/Snackbar.models";

declare module "notistack" {
  interface OptionsObject {
    variant?: CustomSnackbarVariant;
  }
}
