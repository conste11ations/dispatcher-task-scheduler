import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { defaultEventsState } from "./constants/events";

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState(defaultEventsState);

  const handleSelect = ({ start, end, slots = [start, end], action = 'click' }: { start: any, end: any, slots: Date[] | string[], action: string }) => {
    const title = window.prompt('New Event name')
    if (title)
      setEvents({
        events: [
          ...events.events,
          {
            start,
            end,
            title,
          },
        ],
      });
    console.log(start, end, title)
  }

  return (
    <div className="App">
      <Calendar
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView={"week"}
        events={events.events}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect}
        style={{ height: "90vh", width: "90vw", margin: "20px" }}
      />
    </div>
  );
}

export default App;