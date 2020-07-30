import React from "react";
import Form from "./Form";

export default function Task(props: any) {

  return (
    <>
      <div>
        {props.activeEvent &&
          <Form
            events={props.events}
            feedback={props.feedback}
            operation={props.operation}
            validateEvent={props.validateEvent}
            updateEvent={props.updateEvent}
            deleteEvent={props.deleteEvent}
            activeEvent={props.activeEvent}
            show={props.show}
            onCancel={props.onCancel}></Form>}
      </div>
    </>
  );
}