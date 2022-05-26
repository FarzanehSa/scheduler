import React from "react";

import "components/Appointment/styles.scss"
// Custom Hook
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";


export default function Appointment({id, time, interview, interviewers}) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={time} />
      {/* {interview ? <Show student={ interview.student } interviewer={ interview.interviewer } /> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show
        student={ interview.student }
        interviewer={ interview.interviewer } 
        onEdit={() => console.log("Clicked onEdit")}
        onDelete={() => console.log("clicked onDelete")} />}
      {mode === CREATE && <Form 
        interviewers={interviewers}
        onSave={() => console.log("Clicked onSave")}
        onCancel={() => back()}
        />}
    </article>
  )
}