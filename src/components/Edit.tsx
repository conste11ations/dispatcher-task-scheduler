import React from 'react';
import { Formik } from 'formik';

interface t {
  title: string,
  onCancel: any,
  show: boolean,
}

const Edit = ({ title, onCancel, show }: t) => {
  const showHideClassName = show ? "edit display-block" : "edit display-none";
  return (
    <div className={showHideClassName}>
      <h1>My Form</h1>
      <Formik
        initialValues={{ name: title }}
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
            <button type="submit">Submit</button>
            <button type="button" value="Go back!" onClick={() => onCancel()}>Cancel</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Edit;