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

export const isActiveEvent = (activeEvent: Event, event: Event) => {
  return activeEvent === event;
}

