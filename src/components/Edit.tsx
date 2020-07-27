import React, { useEffect } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';

interface t {
  activeEvent: any,
  onCancel: any,
  show: boolean,
}

interface Values {
  name: string;
  startDate: string;
  endDate: string;
}


const Edit = ({ activeEvent, onCancel, show }: t) => {
  const showHideClassName = show ? "edit display-block" : "edit display-none";
  console.log("edit: ae is", activeEvent)
  const initValues = { name: activeEvent.title, startDate: activeEvent.start, endDate: activeEvent.end }

  return (
    <div className={showHideClassName}>
      <h3>Editing event:</h3>
      <p>{activeEvent.title}</p>
      <Formik
        initialValues={initValues}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <div className="formElems">
              <label htmlFor="name">Event<br/>name</label>
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
              <input
                type="datetime-local"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.startDate}
                name="startDate"
              />
            </div>
            <div className="formElems">
            <label htmlFor="endDate">End Datetime</label>
              <input
                type="datetime-local"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.endDate}
                name="endDate"
              />
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