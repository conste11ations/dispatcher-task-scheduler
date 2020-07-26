import moment from "moment";

export const defaultEventsState = {
  events: [
    {
      start: moment().toDate(),
      end: moment()
        .add(1, "days")
        .toDate(),
      title: "Some title"
    }
  ]
};