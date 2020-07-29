import moment from "moment";

export const defaultEventsState = {
  events: [
    {
      start: moment().startOf("day").toDate(),
      end: moment().endOf("day").toDate(),
      title: "Seafood Shipment",
      resource: "Mary",
      eventType: "Pickup",
      location: "10 York St, Toronto, ON M5J 2L9",
      display: true
    },
    {
      start: moment().add(2, "days").startOf("day").add(14.5, "hours").toDate(),
      end: moment().add(2, "days").startOf("day").add(17, "hours").toDate(),
      title: "Coffee Break at Esso Couche-Tard",
      resource: "Bill",
      eventType: "Other",
      location: "3440 St Laurent Blvd, Montreal, Quebec H2X 2T9",
      display: true
    },
    {
      start: moment().startOf("week").add(8, "hours").toDate(),
      end: moment().startOf("week").add(8.5, "hours").toDate(),
      title: "Goods Disposal",
      resource: "Jim",
      eventType: "Dropoff",
      location: "Fine Recycling & Disposal @ 400 Eastern Ave Ste 202, Toronto, ON M4M 1B9",
      display: true
    }
  ]
};