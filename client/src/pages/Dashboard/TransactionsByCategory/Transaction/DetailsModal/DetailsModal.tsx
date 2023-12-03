import CustomModal from "components/mui/CustomModal";
import { TransactionByCategory } from "generated/models/dashboard";

import Details from "./Details/Details";

interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  transactionByCategory: TransactionByCategory;
  selectedDate: Date;
}
const DetailsModal = ({
  open,
  onClose,
  transactionByCategory,
  selectedDate
}: DetailsModalProps) => {
  return (
    <CustomModal open={open} onClose={onClose}>
      <Details
        onClose={onClose}
        transactionByCategory={transactionByCategory}
        selectedDate={selectedDate}
      />
    </CustomModal>
  );
};

export default DetailsModal;
