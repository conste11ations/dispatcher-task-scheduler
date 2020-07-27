import React from "react";
import Datetime from 'react-datetime';
import moment from 'moment';

// const DATE_FORMAT = 'YYYY-MM-DD';
// const TIME_FORMAT = 'HH:mm:ss';

const FormikDateTime = ({ field, defaultValue, form, timeFormat }: { field: any, defaultValue: any, form: any, timeFormat: any }) => {
  // console.log("default", defaultValue);
  const onFieldChange = (value: any) => {
    let dateValue = value;

      // dateValue = moment(value).format(DATE_FORMAT+" "+TIME_FORMAT);
      dateValue = moment(value).toDate();

    form.setFieldValue(field.name, dateValue);
  }

  const onFieldBlur = () => {
    form.setFieldTouched(field.name, true);
  }

  return (
    <Datetime
      // dateFormat={DATE_FORMAT}
      // timeFormat={TIME_FORMAT}
      defaultValue={defaultValue}
      value={defaultValue}
      inputProps={{ id: field.name }}
      onChange={onFieldChange}
      onBlur={onFieldBlur}
    />
  );
}

export default FormikDateTime;