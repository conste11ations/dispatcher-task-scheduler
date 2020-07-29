import React from "react";
import { Formik } from 'formik';

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

const Extract = (props: any) => {
  const initValues = { dateRange: "" };
  return (
    <Formik
      enableReinitialize
      initialValues={initValues}
      onSubmit={values => console.log(values)}
    >
      {props => (
        <form onChange={props.handleSubmit}>
          <div style={{ display: "flex" }}>
            <span className="extract-title">Download Schedule:</span>
            <select className="secondary-nav-filter"
              name="dateRange"
              value={props.values.dateRange}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ display: "block" }}
            >
              <option value="" label=" - Select a date range - " />
              <option value="2" label="2 days" />
              <option value="4" label="4 days" />
              <option value="7" label="7 days" />
              <option value="14" label="14 days" />
              <option value="28" label="28 days" />
            </select>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default Extract;