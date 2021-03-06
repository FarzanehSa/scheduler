import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
export default function InterviewerList(props) {

  const interviewersListitems = props.interviewers.map (interviewer => {
    return (
      <InterviewerListItem
        key={ interviewer.id }
        name={ interviewer.name }
        avatar={ interviewer.avatar }
        setInterviewer={ (event) => props.onChange(interviewer.id) }
        selected={ interviewer.id === props.value }
      />
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{ interviewersListitems }</ul>
    </section>
  )
}

// prop-types testing
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};