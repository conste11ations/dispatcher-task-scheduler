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

  return (
    <div className={showHideClassName}>
      <h3>Editing event:</h3>
      <p>{activeEvent.title}</p>
      <Formik
        initialValues={{ name: activeEvent.title, startDate: activeEvent.start, endDate: activeEvent.end }}
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
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
              name="name"
            />
              <input
                type="time"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.startDate}
                name="startDate"
              />
              <input
                type="time"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.endDate}
                name="endDate"
              />
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