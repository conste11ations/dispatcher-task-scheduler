import React from "react";
import useVisualMode from "../hooks/useVisualMode";
import Edit from "./Edit";


export default function Task(props: any) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(CREATE);

  return (
    <>
    <div>
    {props.activeEvent && <Edit setEvents={props.setEvents} activeEvent={props.activeEvent} show={props.show} onCancel={props.onCancel}></Edit>}
    </div>
    </>
  );
}