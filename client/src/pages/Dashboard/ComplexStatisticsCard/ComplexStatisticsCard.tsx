import { useTranslation } from "react-i18next";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";
import { formatCurrencyString } from "lib/utils/formatCurrencyString";

import { ComplexStatisticsCardProps } from "./ComplexStatisticsCard.models";

const ComplexStatisticsCard = ({
  color = "info",
  title,
  count,
  percentage = {
    color: "success",
    amount: "",
    label: ""
  },
  icon
}: ComplexStatisticsCardProps): JSX.Element => {
  const { i18n } = useTranslation();
  return (
    <Card>
      <CustomBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <CustomBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}>
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </CustomBox>
        <CustomBox textAlign="right" lineHeight={1.25}>
          <CustomTypography variant="button" fontWeight="light" color="text">
            {title}
          </CustomTypography>
          <CustomTypography variant="h4">
            {formatCurrencyString(Number(count) ?? 0, i18n.language)}
          </CustomTypography>
        </CustomBox>
      </CustomBox>
      <Divider />
      <CustomBox pb={2} px={2}>
        <CustomTypography component="p" color="text" display="flex">
          <CustomTypography
            component="span"
            fontSize="small"
            fontWeight="bold"
            color={percentage.color}>
            {percentage.amount}
          </CustomTypography>
          <CustomTypography component="span" fontSize="small">
            &nbsp;{percentage.label}
          </CustomTypography>
        </CustomTypography>
      </CustomBox>
    </Card>
  );
};

export default ComplexStatisticsCard;
