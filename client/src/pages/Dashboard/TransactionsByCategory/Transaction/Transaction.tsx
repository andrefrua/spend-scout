import Icon from "@mui/material/Icon";

import CustomTypography from "components/mui/CustomTypography";
import CustomBox from "components/mui/CustomBox";
import CustomButton from "components/mui/CustomButton";
import { TransactionProps } from "./Transaction.models";

const Transaction = ({
  color,
  icon,
  name,
  description,
  value
}: TransactionProps): JSX.Element => {
  return (
    <CustomBox key={name} component="li" py={1} pr={2} mb={1}>
      <CustomBox
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <CustomBox display="flex" alignItems="center">
          <CustomBox mr={2}>
            <CustomButton variant="outlined" color={color} iconOnly circular>
              <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
            </CustomButton>
          </CustomBox>
          <CustomBox display="flex" flexDirection="column">
            <CustomTypography variant="button" fontWeight="medium" gutterBottom>
              {name}
            </CustomTypography>
            <CustomTypography
              variant="caption"
              color="text"
              fontWeight="regular">
              {description}
            </CustomTypography>
          </CustomBox>
        </CustomBox>
        <CustomTypography variant="button" color={color} fontWeight="medium">
          {value}
        </CustomTypography>
      </CustomBox>
    </CustomBox>
  );
};

export default Transaction;
