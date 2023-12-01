import { Theme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import CustomBox from "components/mui/CustomBox";
import CustomBadge from "components/mui/CustomBadge";
import { RowColor } from "../BankStatements.models";
import { customBadgeStyles } from "./Legend.styles";

const Legend = () => {
  const { t } = useTranslation();

  return (
    <CustomBox display="flex" justifyContent="flex-end" mx={3}>
      <CustomBox mr={1}>
        <CustomBadge
          mr={1}
          size="xs"
          sx={(theme: Theme) => customBadgeStyles(theme, RowColor.Accepted)}
          badgeContent={t("bankStatements.accepted")}
          container
        />
      </CustomBox>
      <CustomBox mr={1}>
        <CustomBadge
          mr={1}
          size="xs"
          sx={(theme: Theme) => customBadgeStyles(theme, RowColor.NotAccepted)}
          badgeContent={t("bankStatements.notAccepted")}
          container
        />
      </CustomBox>
      <CustomBox>
        <CustomBadge
          size="xs"
          sx={(theme: Theme) => customBadgeStyles(theme, RowColor.Duplicated)}
          badgeContent={t("bankStatements.duplicated")}
          container
        />
      </CustomBox>
    </CustomBox>
  );
};

export default Legend;
