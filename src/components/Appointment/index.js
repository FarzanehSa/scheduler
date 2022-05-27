import React from "react";

import "components/Appointment/styles.scss"
// Custom Hook
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";


export default function Appointment({id, time, interview, interviewers, bookInterview}) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    bookInterview(id, interview)
    .then(() => transition(SHOW))
  } 

  //console.log('🟣',interview && interview.id)
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show 
        student={ interview.student }
        interviewer={ interview.interviewer } 
        onEdit={() => console.log("Clicked onEdit")}
        onDelete={() => console.log("clicked onDelete")} />}
      {mode === CREATE && <Form 
        interviewers={interviewers}
        onSave={save}
        onCancel={() => back()} />}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  )
}