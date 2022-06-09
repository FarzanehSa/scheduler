import React, {useEffect} from "react";

import "components/Appointment/styles.scss"
// Custom Hook
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment({id, time, interview, interviewers, bookInterview, cancelInterview}) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  // After implementing websocket, we need to update visual mode!
  useEffect(() => {
    if (mode === EMPTY && interview) {
      transition(SHOW);
    }
    if (mode === SHOW && !interview) {
      transition(EMPTY);
    }
  },[interview, mode, transition]);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true))
  } 
  
  function remove() {
    if (mode === CONFIRM) {
      transition(DELETING, true)
      cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
    } else {
      transition(CONFIRM)
    }
  }
  
  //console.log('🟣',interview && interview.id)
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && <Show 
        student={ interview.student }
        interviewer={ interview.interviewer } 
        onEdit={() => transition(EDIT)}
        onDelete={remove} />}
      {mode === CREATE && <Form 
        interviewers={interviewers}
        onSave={save}
        onCancel={back} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm 
        message="Are you sure you would like to delete?"
        onConfirm={remove}
        onCancel={back}/>}
      {mode === EDIT && <Form 
        interviewers={interviewers}
        onSave={save}
        onCancel={back} 
        student={interview.student}
        interviewer={interview.interviewer.id}/>}
      {mode === ERROR_SAVE && <Error
          message="Could not update appointment."
          onClose={back}/>}
      {mode === ERROR_DELETE && <Error
          message="Could not cancel appointment."
          onClose={back}/>}
    </article>
  )
}