export interface CalendarEvents {
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  className?: string;
}

export type CalendarProps = {
  header?: {
    title?: string;
    date?: string;
  };
  events: CalendarEvents[];
  [key: string]: unknown;
};
