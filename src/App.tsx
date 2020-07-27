import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { defaultEventsState } from "./constants/events";
import Task from "./components/index"
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

export interface Event {
  allDay?: boolean;
  title: string;
  start: Date;
  end: Date;
  resource?: any;
}

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState(defaultEventsState);
  const [activeEvent, setActiveEvent] = useState(undefined)
  const [show, setShow] = useState(false);

  const isActiveEvent = (activeEvent: Event, event: Event) => {
    return activeEvent === event;
  }


  const showEditForm = (event: any) => {
    setActiveEvent(event);
    setShow(true);
  }

  const hideEditForm = () => {
    setShow(false);
  }

  const updateEvent = (activeEvent: Event, updatedEvent: Event) => {
    console.log("received updatedEvent", updatedEvent)
    const eventCopy = events.events.filter(e => !isActiveEvent(activeEvent, e))
    setEvents({ events: [...eventCopy, updatedEvent] });
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
          }
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