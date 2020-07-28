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
  resource: string;
  eventType: string;
  location: string;
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
  };

  const hideEditForm = () => {
    setShow(false);
  };

  const updateEvent = (activeEvent: Event, updatedEvent: Event) => {

    const eventCopy = events.events.filter(e => !isActiveEvent(activeEvent, e));
    const parsedUpdatedEvent = (e: any) => {
      return { title: e.title, start: e.startDate, end: e.endDate, resource: e.resource, eventType: e.eventType, location: e.location }
    };

    setEvents({ events: [...eventCopy, parsedUpdatedEvent(updatedEvent)] });
    setActiveEvent(undefined);
    hideEditForm();
  };

  const deleteEvent = (activeEvent: Event) => {
    const eventCopy = events.events.filter(e => !isActiveEvent(activeEvent, e));
    setEvents({ events: [...eventCopy] });
    setActiveEvent(undefined);
    hideEditForm();
  };

  const handleSelect = ({ start, end, slots = [start, end], action = 'click' }: { start: any, end: any, slots: Date[] | string[], action: string }) => {
    const title = window.prompt('New Event name')
    // to change the following 3 var
    const resource = "Jim";
    const eventType = "Dropoff";
    const location = "Temp location"
    if (title)
      setEvents({ events: [...events.events, { start, end, title, resource, eventType, location }] });
    console.log(start, end, title)
  }

  return (
    <div className="App">
      <Task
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
        activeEvent={activeEvent}
        show={show}
        onCancel={hideEditForm}>
      </Task>
      <Calendar
        dayLayoutAlgorithm="no-overlap"
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