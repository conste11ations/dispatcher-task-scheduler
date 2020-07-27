import moment from "moment";

export const defaultEventsState = {
  events: [
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Example event"
    },
    {
      start: moment().add(2, "days").toDate(),
      end: moment().add(2, "days").add(3, "hours").toDate(),
      title: "Another event"
    }
  ]
};