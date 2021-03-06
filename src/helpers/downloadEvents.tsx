/* eslint-disable eqeqeq */
import moment from "moment";

export interface Event {
  allDay?: boolean;
  title: string;
  start: Date;
  end: Date;
  resource: string;
  eventType: string;
  location: string;
  display: boolean;
}

export const createCSVFile = (events: Event[], dateRange: number) => {
  const date_format = "YYYY/MM/DD";
  const dateTuples = divideDates(dateRange);
  const filteredEvents = events.filter(e => e.display === true);
  let extractArray = [];

  for (const tuple of dateTuples) {
    let record = [];
    record.push(moment(tuple[0]).format(date_format) + " - " + moment(tuple[1]).format(date_format));
    record.push(countActivityByDateRange(tuple[0], tuple[1], filteredEvents, "Pickup"));
    record.push(countActivityByDateRange(tuple[0], tuple[1], filteredEvents, "Dropoff"));
    record.push(countActivityByDateRange(tuple[0], tuple[1], filteredEvents, "Other"));
    extractArray.push(record);
  }
  triggerDownload(convertForStreaming(extractArray), `schedule-dateRange-${dateRange}-days.csv`);
}

export const triggerDownload = (dataStream: string, fileName: string) => {
    let a = document.createElement('a');
    a.href = 'data:application/octet-stream,' + dataStream;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

export const convertForStreaming = (objArray: object[]) => {
  const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = "Time-Frame%2CPickup%2CDrop-off%2COther%0A";

  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (const index in array[i]) {
      if (line != '') line += '%2C'

      line += array[i][index];
    }
    str += line + '%0A';
  }
  return str;
}

export const divideDates = (dateRange: number) => {
  const todayDate = moment().startOf("day").toDate();
  let currentDate = todayDate;
  let result = [];
  const iterations = Math.floor(365 / dateRange);

  for (let i = 0; i < iterations; i++) {
    const currentDatePlusDateRange = moment(currentDate).add(dateRange, "day").toDate();
    result.push([currentDate, currentDatePlusDateRange]);
    currentDate = currentDatePlusDateRange;
  }
  return result;
}

export const countActivityByDateRange = (startDate: Date, endDate: Date, events: Event[], activity: string) => {
  return events.filter(e => e.eventType === activity && startDate <= e.start && endDate > e.end).length;
}
