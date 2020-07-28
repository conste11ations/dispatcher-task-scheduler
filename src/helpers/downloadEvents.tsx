/* eslint-disable eqeqeq */

export interface Event {
  allDay?: boolean;
  title: string;
  start: Date;
  end: Date;
  resource: string;
  eventType: string;
  location: string;
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

export const divideEvents = (events: Event[]) => {
  // will be used by the dropdown menu to filter according to specified divisions
}