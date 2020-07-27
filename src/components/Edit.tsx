///<reference path="../../typings/index.d.ts"/>
import React from 'react';
import { Formik, Field } from 'formik';
import FormikDateTime from "./FormikDateTime";

interface t {
  updateEvent: any,
  activeEvent: Event,
  onCancel: any,
  show: boolean,
}

interface Values {
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface Event {
  allDay?: boolean;
  title: string;
  start: Date;
  end: Date;
  resource?: any;
}

const Edit = ({ updateEvent, activeEvent, onCancel, show }: t) => {
  const showHideClassName = show ? "edit display-block" : "edit display-none";
  const initValues = { name: activeEvent.title, startDate: activeEvent.start, endDate: activeEvent.end, resource: activeEvent.resource }
  console.log("nit", initValues);

  return (
    <div className={showHideClassName}>
      <h2>Modifying the following event:</h2>
      <Formik
        enableReinitialize
        initialValues={initValues}
        onSubmit={(values: Values) => updateEvent(activeEvent, values)}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <div className="formElems">
              <label htmlFor="name">Event<br />name</label>
              <input
                id="name"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
              />
            </div>
            <div className="formElems">
              <label htmlFor="startDate" style={{ marginRight: "-6px" }}>Start<br />Datetime</label>
              <Field name="startDate" defaultValue={props.values.startDate} timeFormat={true} component={FormikDateTime} />
            </div>
            <div className="formElems">
              <label htmlFor="endDate" style={{ marginRight: "-6px" }}>End<br />Datetime</label>
              <Field name="endDate" defaultValue={props.values.endDate} timeFormat={true} component={FormikDateTime} />
            </div>
            <div className="formElems">
              <label htmlFor="resource">Event<br />Resource</label>
              <input
                id="resource"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.resource}
                name="resource"
              />
            </div>
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <div>
              <button className="button" type="submit">Update</button>
              <button className="button" type="button" value="back" onClick={() => onCancel()}>Cancel</button>
              <button className="button" type="button">Delete</button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Edit;