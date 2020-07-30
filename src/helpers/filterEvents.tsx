interface Event {
  allDay?: boolean;
  title: string;
  start: Date;
  end: Date;
  resource: string;
  eventType: string;
  location: string;
  display: boolean;
}

export const filterEventsByDriver = (events: Event[], driver: string) => {
  driver === "" ?
    events.map(e => e.display = true) :
    events.map(e => e.display = e.resource === driver ? true : false);
  return { events };
}

export const displayVisibleEvents = (events: Event[]) => {
  return events.filter(e => e.display === true)
}