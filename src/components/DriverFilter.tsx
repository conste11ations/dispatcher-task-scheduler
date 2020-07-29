import React from "react";
import { Formik } from "formik";
import { filterEventsByDriver } from "../helpers/filterEvents";

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

const DriverFilter = (props: any) => {
  const initValues = { driver: "" };
  return (
    <Formik
      enableReinitialize
      initialValues={initValues}
      onSubmit={values => props.setEvents(filterEventsByDriver(props.events, values.driver))}
    >
      {props => (
        <form onChange={props.handleSubmit}>
          <div>
            <select className="secondary-nav-filter"
              name="driver"
              value={props.values.driver}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ display: "block" }}
            >
              <option value="" label=" - Filter by driver - " />
              <option value="Bill" label="Bill" />
              <option value="Mary" label="Mary" />
              <option value="Jim" label="Jim" />
            </select>
          </div>
        </form>
      )}
    </Formik >
  )
};

export default DriverFilter;