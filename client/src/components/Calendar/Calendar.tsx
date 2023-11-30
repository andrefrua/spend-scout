import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import Card from "@mui/material/Card";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";

import { useUIContext } from "context/UIProvider";

import StyledCalendar from "./StyledCalendar";

import { CalendarEvents, CalendarProps } from "./Calendar.models";

const Calendar = ({
  header = {
    title: "",
    date: ""
  },
  ...others
}: CalendarProps): JSX.Element => {
  const {
    state: { isDarkMode }
  } = useUIContext();

  const validClassNames = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark"
  ];

  const events = others.events
    ? others.events.map((el: CalendarEvents) => ({
        ...el,
        allDay: true,
        className: validClassNames.find(item => item === el.className)
          ? `event-${el.className}`
          : "event-info"
      }))
    : [];

  return (
    <Card sx={{ height: "100%" }}>
      <CustomBox pt={header.title || header.date ? 2 : 0} px={2} lineHeight={1}>
        {header.title ? (
          <CustomTypography
            variant="h6"
            fontWeight="medium"
            textTransform="capitalize">
            {header.title}
          </CustomTypography>
        ) : null}
        {header.date ? (
          <CustomTypography
            component="p"
            variant="button"
            color="text"
            fontWeight="regular">
            {header.date}
          </CustomTypography>
        ) : null}
      </CustomBox>
      <StyledCalendar p={2} $ownerState={{ isDarkMode }}>
        <FullCalendar
          {...others}
          plugins={[dayGridPlugin]}
          events={events}
          height="100%"
        />
      </StyledCalendar>
    </Card>
  );
};

export default Calendar;
