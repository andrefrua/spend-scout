import { Theme } from "@mui/material/styles";

import {
  CustomPaginationVariant,
  CustomPaginationSize
} from "../CustomPagination.models";

export type StyledCustomPaginationProps = {
  theme?: Theme | any;
  $ownerState: {
    variant: CustomPaginationVariant;
    paginationSize: CustomPaginationSize;
    active: boolean;
  };
};
