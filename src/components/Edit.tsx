///<reference path="../../typings/index.d.ts"/>
import React, { useEffect } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import Datetime from "react-datetime";
import FormikDateTime from "./FormikDateTime"
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
  const initValues = { name: activeEvent.title, startDate: activeEvent.start, endDate: activeEvent.end }

  return (
    <div className={showHideClassName}>
      <h3>Editing the following event:</h3>
      <Formik
        enableReinitialize
        initialValues={initValues}
        onSubmit={(values: Values) => console.log("values", values)}
      // onSubmit={(
      //   values: Values,
      //   { setSubmitting }: FormikHelpers<Values>
      // ) => {
      //   //updateEvent(values);
      //   setTimeout(() => {
      //     alert(JSON.stringify(values, null, 2));
      //     setSubmitting(false);
      //   }, 500);
      // }}
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
              <label htmlFor="startDate">Start Datetime</label>
              <Field name="startDate" defaultValue={props.values.startDate} timeFormat={true} component={FormikDateTime} />
            </div>
            <div className="formElems">
              <label htmlFor="endDate">End Datetime</label>
              <Field name="endDate" defaultValue={props.values.endDate} timeFormat={true} component={FormikDateTime} />
            </div>
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <div>
              <button className="button" type="submit">Submit</button>
              <button className="button" type="button" value="Go back!" onClick={() => onCancel()}>Cancel</button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Edit;