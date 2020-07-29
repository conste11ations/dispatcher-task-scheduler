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

  // come up with array of date ranges: divideDates()
  // filter only events that have display: show (courtesy of filterEvents)
  // countActivityByDateRange()

  // write to obj (JSON) (this fn)
  // turn into CSV format and write to file (this fn)

const date_format = "YYYY/MM/DD";  
const dateTuples = divideDates(dateRange);
const filteredEvents = events.filter(e => e.display === true);

let extractArray = []; // [[date1-date2, 2, 2, 1], [date2-date3, 0, 1, 2], ...]

for (const tuple of dateTuples) {
  let record = [];
  record.push(moment(tuple[0]).format(date_format) + " - " + moment(tuple[1]).format(date_format));
  record.push(countActivityByDateRange(tuple[0], tuple[1], filteredEvents, "Pickup"));
  record.push(countActivityByDateRange(tuple[0], tuple[1], filteredEvents, "Dropoff"));
  record.push(countActivityByDateRange(tuple[0], tuple[1], filteredEvents, "Other"));
  extractArray.push(record);
}
// console.log("extractArray", extractArray);
console.log(ConvertToCSV(extractArray))
}

export const ConvertToCSV = (objArray: object[]) => {
  //dont forget to put header
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index];
      }

      str += line + '\r\n';
  }
  console.log("convertToCSV", str);
  return str;
}

export const divideDates = (dateRange: number) => {
  const todayDate = moment().startOf("day").toDate();
  let currentDate = todayDate;
  // let result: {[k: string]: any} = {};
  let result = [];

  const iterations = Math.floor(365/dateRange);
  
  for (let i = 0; i <= iterations; i++) {
    const currentDatePlusDateRange = moment(currentDate).add(dateRange, "day").toDate();
    result.push([currentDate, currentDatePlusDateRange]);
    currentDate = currentDatePlusDateRange;
  }
  return result;
}

export const countActivityByDateRange = (startDate: Date, endDate: Date, events: Event[], activity: string) => {
  return events.filter(e => e.eventType === activity && startDate <= e.start && endDate > e.end).length;
}
