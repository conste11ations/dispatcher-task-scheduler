///<reference path="../../typings/index.d.ts"/>
import React from 'react';
import { Formik, Field } from 'formik';
import FormikDateTime from "./FormikDateTime";

interface t {
  operation: "CREATE" | "EDIT" | "",
  events: Event[];
  validateEvent: any;
  updateEvent: any,
  deleteEvent: any,
  activeEvent: Event,
  onCancel: any,
  show: boolean,
  feedback: string;
}

interface Values {
  title: string;
  startDate: Date;
  endDate: Date;
  resource: string;
  eventType: string;
  location: string;
}

interface Event {
  allDay?: boolean;
  title: string;
  start: Date;
  end: Date;
  resource: string;
  eventType: string;
  location: string;
  display: boolean;
}

const Form = ({ operation, events, validateEvent, updateEvent, deleteEvent, activeEvent, onCancel, show, feedback }: t) => {
  const showHideClassName = show ? "edit display-block" : "edit display-none";
  const initValues = { title: activeEvent.title, startDate: activeEvent.start, endDate: activeEvent.end, resource: activeEvent.resource, eventType: activeEvent.eventType, location: activeEvent.location, display: true }

  return (
    <div className={showHideClassName}>
      <h1>{operation === "CREATE" ? "Create an Event" : "Modify an Event"}</h1>
      <Formik
        enableReinitialize
        initialValues={initValues}
        onSubmit={(values: Values) => validateEvent(operation, activeEvent, values, events) && updateEvent(activeEvent, values)}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <div className="formElems">
              <label htmlFor="name">Event<br />name</label>
              <input
                id="title"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.title}
                name="title"
              />
            </div>
            <div className="formElems" style={{ paddingBottom: "0px" }}>
              <label htmlFor="startDate" style={{ marginTop: "-5px", marginRight: "-6px" }}>Start<br />Datetime</label>
              <Field name="startDate" defaultValue={props.values.startDate} timeFormat={true} component={FormikDateTime} />
            </div>
            <div className="formElems" style={{ marginTop: "-5px", paddingBottom: "0px" }}>
              <label htmlFor="endDate" style={{ marginTop: "-5px", marginRight: "-6px" }}>End<br />Datetime</label>
              <Field name="endDate" defaultValue={props.values.endDate} timeFormat={true} component={FormikDateTime} />
            </div>
            <div className="formElems">
              <label htmlFor="resource">Event<br />Resource</label>
              <select
                name="resource"
                value={props.values.resource}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                style={{ display: 'block' }}
              >
                <option value="" label="Select a driver" />
                <option value="Bill" label="Bill" />
                <option value="Mary" label="Mary" />
                <option value="Jim" label="Jim" />
              </select>
            </div>
            <div className="formElems">
              <label htmlFor="eventType">Event<br />Type</label>
              <select
                name="eventType"
                value={props.values.eventType}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                style={{ display: 'block' }}
              >
                <option value="" label="Select an event type" />
                <option value="Pickup" label="Pickup" />
                <option value="Dropoff" label="Dropoff" />
                <option value="Other" label="Other" />
              </select>
            </div>
            <div className="formElems">
              <label htmlFor="location">Event<br />Location</label>
              <input
                id="location"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.location}
                name="location"
              />
            </div>
            {feedback && <div className="feedback">{feedback}</div>}
            {props.errors.resource && props.touched.resource && <div className="input-feedback">{props.errors.resource}</div>}
            {props.errors.eventType && props.touched.eventType && <div className="input-feedback">{props.errors.eventType}</div>}
            {props.errors.title && <div id="feedback">{props.errors.title}</div>}
            <div>
              {operation === "EDIT" && <button className="button" type="submit">Update</button>}
              {operation === "CREATE" && <button className="button" type="submit">Create</button>}
              <button className="button" type="button" value="back" onClick={() => onCancel()}>Cancel</button>
              {operation === "EDIT" && <button className="button" type="button" onClick={() => deleteEvent(activeEvent)}>Delete</button>}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Form;