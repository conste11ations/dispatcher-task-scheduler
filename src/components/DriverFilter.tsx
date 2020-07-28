import React from "react";

const DriverFilter = () => {
  return (
    <div>
        <select className="secondary-nav-filter"
          name="driverFilter"
          value={""}
          // onChange={}
          // onBlur={}
          style={{ display: "block" }}
        >
          <option value="" label=" - Filter by driver - " />
          <option value="Bill" label="Bill" />
          <option value="Mary" label="Mary" />
          <option value="Jim" label="Jim" />
        </select>
    </div>
  )
};

export default DriverFilter;