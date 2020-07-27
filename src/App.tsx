import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { defaultEventsState } from "./constants/events";
import Task from "./components/index"
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState(defaultEventsState);
  const [activeEvent, setActiveEvent] = useState(defaultEventsState.events[0])
  const [show, setShow] = useState(false);

  const showEditForm = (event: any) => {
    setActiveEvent(event);
    setShow(true);
  }

  const hideEditForm = () => {
    setShow(false);
  }

  const updateEvent = (input: any) => {
    console.log("input", input)
  }

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
      <Task
        updateEvent={updateEvent}
        activeEvent={activeEvent}
        show={show}
        onCancel={hideEditForm}>
      </Task>
      <Calendar
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView={"week"}
        events={events.events}
        onSelectEvent={event => showEditForm(event)}
        onSelectSlot={handleSelect}
        style={{ margin: "auto", height: "90vh", width: "90vw" }}
      />
    </div>
  );
}

export default App;