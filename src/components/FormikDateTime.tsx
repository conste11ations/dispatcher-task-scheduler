import React from "react";
import Datetime from 'react-datetime';
import moment from 'moment';

const FormikDateTime = ({ field, defaultValue, form, timeFormat }: { field: any, defaultValue: any, form: any, timeFormat: any }) => {

  const onFieldChange = (value: any) => {
    let dateValue = value;

      dateValue = moment(value).toDate();

    form.setFieldValue(field.name, dateValue);
  }

  const onFieldBlur = () => {
    form.setFieldTouched(field.name, true);
  }

  return (
    <Datetime
      defaultValue={defaultValue}
      value={defaultValue}
      inputProps={{ id: field.name }}
      onChange={onFieldChange}
      onBlur={onFieldBlur}
    />
  );
}

export default FormikDateTime;