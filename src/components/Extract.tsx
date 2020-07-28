import React from "react";
import { Formik } from 'formik';

const Extract = () => {
  return (
    <div style={{ display: "flex" }}>
      <span className="extract-title">Download Schedule:</span>
      <select className="secondary-nav-filter"
        name="downloadSchedule"
        value={"value"}
        // onChange={}
        // onBlur={}
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
  )
}

export default Extract;