import React from "react";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props) {

  const interviewersListitems = props.interviewers.map (interviewer => {
    return (
      <InterviewerListItem 
        key={ interviewer.id }
        { ...interviewer }
        setInterviewer={ (event) => props.setInterviewer(interviewer.id) }
        selected={ interviewer.id === props.interviewer }
      />
    )
  }) 

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{ interviewersListitems }</ul>
    </section>
  )
}