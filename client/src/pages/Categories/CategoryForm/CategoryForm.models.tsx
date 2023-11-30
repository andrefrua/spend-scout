import { Category } from "generated/models/category";

export interface CategoryFormProps {
  embeddedMode?: false;
  onSubmit?: (categoryData: Category) => void;
  onCancel?: () => void;
}

export interface EmbeddedCategoryFormProps {
  embeddedMode: true;
  onSubmit: (categoryData: Category) => void;
  onCancel: () => void;
}
