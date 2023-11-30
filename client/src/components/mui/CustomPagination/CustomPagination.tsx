import { forwardRef, createContext, useContext, useMemo } from "react";

import CustomBox from "components/mui/CustomBox";

import StyledCustomPagination from "./StyledCustomPagination";

import { CustomPaginationProps } from "./CustomPagination.models";

// The Pagination main context
const Context = createContext<any>(null);

const CustomPagination = forwardRef<HTMLButtonElement, CustomPaginationProps>(
  (props, ref) => {
    const {
      item = false,
      variant = "gradient",
      color = "info",
      size = "medium",
      active = false,
      children,
      ...others
    }: CustomPaginationProps = props;

    const context: any = useContext(Context);
    const paginationSize = context ? context.size : undefined;

    const providerValue = useMemo(
      () => ({
        variant,
        color,
        size
      }),
      [variant, color, size]
    );

    return (
      <Context.Provider value={providerValue}>
        {item ? (
          <StyledCustomPagination
            {...others}
            ref={ref}
            variant={active ? context.variant : "outlined"}
            color={active ? context.color : "secondary"}
            iconOnly
            circular
            $ownerState={{ variant, active, paginationSize }}>
            {children}
          </StyledCustomPagination>
        ) : (
          <CustomBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ listStyle: "none" }}>
            {children}
          </CustomBox>
        )}
      </Context.Provider>
    );
  }
);

export default CustomPagination;
