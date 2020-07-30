import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { defaultEventsState } from "./constants/events";
import Task from "./components/index"
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DriverFilter from "./components/DriverFilter";
import Extract from "./components/Extract";
import { displayVisibleEvents } from "./helpers/filterEvents";
import { isActiveEvent, checkForConflictingEvents } from "./helpers/validateEvents";
import useVisualMode from "./hooks/useVisualMode";

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

interface Values {
  title: string;
  startDate: Date;
  endDate: Date;
  resource: string;
  eventType: string;
  location: string;
}

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState(defaultEventsState); // events state in place of a database
  const [activeEvent, setActiveEvent] = useState({});
  const [show, setShow] = useState(false);
  const [feedback, setFeedback] = useState("");

  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const DELETE = "DELETE";

  const { mode, transition, back } = useVisualMode("");

  const showEditForm = (event: any) => {
    transition(EDIT);
    setActiveEvent(event);
    setShow(true);
  };

  const hideEditForm = () => {
    setShow(false);
  };

  const updateEvent = (activeEvent: Event, updatedEvent: Values) => {
    const eventCopy = events.events.filter(e => !isActiveEvent(activeEvent, e));
    const parsedUpdatedEvent = (e: any) => {
      return { title: e.title, start: e.startDate, end: e.endDate, resource: e.resource, eventType: e.eventType, location: e.location, display: e.display }
    };

    setEvents({ events: [...eventCopy, parsedUpdatedEvent(updatedEvent)] });
    hideEditForm();
  };

  const deleteEvent = (activeEvent: Event) => {
    const eventCopy = events.events.filter(e => !isActiveEvent(activeEvent, e));
    setEvents({ events: [...eventCopy] });
    hideEditForm();
  };

  const createEvent = ({ start, end, slots = [start, end], action = 'click' }: { start: any, end: any, slots: Date[] | string[], action: string }) => {
    setFeedback("");
    transition(CREATE);
    setActiveEvent({ start, end, title: "", resource: "", eventType: "", location: "", display: true });
    setShow(true);
  }

  const validateEvent: any = (mode: string, activeEvent: Event, eventToValidate: Values, events: Event[]) => {
    console.log(eventToValidate);
    const conflictingEvents = checkForConflictingEvents(eventToValidate.startDate, eventToValidate.endDate, events);
    console.log("conflictingEvents", conflictingEvents)
    if (conflictingEvents.length > 0) {
      setFeedback(`The event you are trying to create conflicts with the task above. 
        You can either update it or delete it!`);
      setActiveEvent(conflictingEvents[0]);
      transition(EDIT);
      return false;
    } else {
      setFeedback("");
      updateEvent(activeEvent, eventToValidate);
    }
    //if CREATE, validate if event conflicts with others. If yes, transition to EDIT (of that conflicting event)
    // "The event you are trying to create conflicts with this task." on a loop until there are no conflicting tasks
    //if EDIT, validate if event conflicts with others. If yes, transition to DELETE (option to delete conflicting event or go back)


    return true;
  }

  return (
    <div className="App">
      <Task
        feedback={feedback}
        operation={mode}
        events={events.events}
        validateEvent={validateEvent}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
        activeEvent={activeEvent}
        show={show}
        onCancel={hideEditForm}>
      </Task>
      <div id="secondary-nav" style={{ display: "flex", fontFamily: "inherit" }} className="secondary-nav">
        <DriverFilter
          events={events.events}
          setEvents={setEvents}>
        </DriverFilter>
        <Extract
          events={events.events}>
        </Extract>
      </div>
      <Calendar
        // dayLayoutAlgorithm="no-overlap"
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView={"week"}
        events={displayVisibleEvents(events.events)}
        onSelectEvent={event => showEditForm(event)}
        onSelectSlot={createEvent}
        style={{ margin: "auto", height: "90vh", width: "90vw" }}
      />
    </div>
  );
}

export default App;