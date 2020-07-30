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

export const checkForConflictingEvents = (currentStart: Date, currentEnd: Date, events: Event[]) => {
  const startDateIntersects = (currentStart: Date, currentEnd: Date, e: Event) => {
    return currentStart <= e.start && currentEnd >= e.start;
  }
  const endDateIntersects = (currentStart: Date, currentEnd: Date, e: Event) => {
    return currentStart <= e.end && currentEnd >= e.end;
  }
  return events.filter(e => startDateIntersects(currentStart, currentEnd, e) || endDateIntersects(currentStart, currentEnd, e));
}
