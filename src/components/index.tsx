import React from "react";
import Form from "./Form";


export default function Task(props: any) {

  return (
    <>
      <div>
        {props.activeEvent &&
          <Form
            operation={props.operation}
            updateEvent={props.updateEvent}
            deleteEvent={props.deleteEvent}
            activeEvent={props.activeEvent}
            show={props.show}
            onCancel={props.onCancel}></Form>}
      </div>
    </>
  );
}