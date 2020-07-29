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

export const createCSVFile = (events: Event[], dateRange: number, driver: string) => {
  // probably need an activeDriver state?
  // come up with array of date ranges: divideDates()
  // filter for the active driver
  // countActivityByDateRange()
  // write to obj (JSON) (this fn)
  // turn into CSV format and write to file (this fn)

console.log("createCSVFile", events);
console.log(divideDates(dateRange));


}

export const ConvertToCSV = (events: Event[]) => {
  var array = typeof events != 'object' ? JSON.parse(events) : events;
  var str = '';

  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index];
      }

      str += line + '\r\n';
  }
  console.log(str);
  return str;
}

export const divideDates = (dateRange: number) => {
  const todayDate = moment().toDate();
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

}
