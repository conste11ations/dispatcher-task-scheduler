import React from 'react';
import { Formik } from 'formik';

interface t {
  activeEvent: any,
  onCancel: any,
  show: boolean,
}

const Edit = ({ activeEvent, onCancel, show }: t) => {
  const showHideClassName = show ? "edit display-block" : "edit display-none";
  console.log("edit: ae is", activeEvent)
  return (
    <div className={showHideClassName}>
      <h3>Editing event:</h3>
      <p>{activeEvent.title}</p>
      <Formik
        initialValues={{ name: activeEvent.title }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
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