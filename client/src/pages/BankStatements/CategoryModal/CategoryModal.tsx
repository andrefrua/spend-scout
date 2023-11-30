import CustomModal from "components/mui/CustomModal";
import CategoryForm from "pages/Categories/CategoryForm";
import { Category } from "generated/models/category";

interface CategoryModalProps {
  open: boolean;
  onClose: (
    reason: string,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSubmit: (selectedCategory: Category) => void;
}
const CategoryModal = ({ open, onClose, onSubmit }: CategoryModalProps) => {
  return (
    <CustomModal
      open={open}
      onClose={(event, reason: string) => {
        onClose?.(reason, event);
      }}>
      <CategoryForm
        embeddedMode
        onSubmit={onSubmit}
        onCancel={() => onClose("", undefined)}
      />
    </CustomModal>
  );
};

export default CategoryModal;
