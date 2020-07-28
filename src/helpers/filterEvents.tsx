export interface Event {
  allDay?: boolean;
  title: string;
  start: Date;
  end: Date;
  resource: string;
  eventType: string;
  location: string;
}

export const filterEventsByDriver = (events: Event[], driver: string) => {
  return events.filter(e => e.resource === driver);
}