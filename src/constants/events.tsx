import moment from "moment";

export const defaultEventsState = {
  events: [
    {
      start: moment().startOf("day").toDate(),
      end: moment().endOf("day").toDate(),
      title: "Example event"
    },
    {
      start: moment().add(2, "days").toDate(),
      end: moment().add(2, "days").add(3, "hours").toDate(),
      title: "Another event"
    }
  ]
};