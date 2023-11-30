import Loading from "components/Loading";
import CustomBox from "components/mui/CustomBox";
import { useUIContext } from "context/UIProvider";

const DataTableLoading = () => {
  const {
    state: { verticalNavItemColor }
  } = useUIContext();

  return (
    <CustomBox
      p={3}
      display="flex"
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      flexDirection={{ xs: "column", sm: "row" }}>
      <Loading color={verticalNavItemColor} position="relative" />
    </CustomBox>
  );
};

export default DataTableLoading;
