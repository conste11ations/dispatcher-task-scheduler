import moment from "moment";

export const defaultEventsState = {
  events: [
    {
      start: moment().startOf("day").toDate(),
      end: moment().endOf("day").toDate(),
      title: "Example event"
    },
    {
      start: moment().add(2, "days").startOf("day").add(14.5, "hours").toDate(),
      end: moment().add(2, "days").startOf("day").add(17, "hours").toDate(),
      title: "Another event"
    }
  ]
};