import React from "react";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

// Custom Hook
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  // ⚪️ get interviewers for specific day
  const dailyInterviwers = getInterviewersForDay(state, state.day);
  
  // ⚪️ get appointment for specific day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

 const appointmentsArray = dailyAppointments.map(appointment => {
    const interview = getInterview( state, appointment.interview );

    return (
      <Appointment 
        key={ appointment.id }
        id={ appointment.id }
        time={ appointment.time }
        interview={ interview }
        interviewers={ dailyInterviwers }
        bookInterview={ bookInterview }
        cancelInterview={ cancelInterview }
      />
    )
  });
  
  // console.log('🧾', appointmentsArray);  //🚨🚨🚨

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

          <DayList
            days={ state.days }
            value={ state.day }
            onChange={ setDay }
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { appointmentsArray }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
