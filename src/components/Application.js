import React, { useState,useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";

export default function Application(props) {
  
  // ⚪️ Combined State for day, days and appointment
  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments:{},
    interviewers:{}
  });

  const setDay = day => setState({...state, day});
  
  // ⚪️ get interviewers for specific day
  const dailyInterviwers = getInterviewersForDay(state, state.day);
  
  // ⚪️ get appointment for specific day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

 const appointmentsArray = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviwers} 
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        />
    )
  })
  // console.log('🧾', appointmentsArray);  //🚨🚨🚨

  function bookInterview(id, interview) {
    // console.log(id, interview);    //🚨🚨🚨
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    // correct path but confused me so same result but different way to say it
    const putApiPromise = axios.put(`/api/appointments/${id}`, {interview});
    const secondPromise = putApiPromise.then(() => setState({...state, appointments}))
    return secondPromise;
    // return (
    // axios.put(`/api/appointments/${id}`, {interview})
    //   .then(() => setState({...state, appointments}))
    // )
  }

  function cancelInterview(id) {
    console.log("delete", id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return (
      axios.delete(`/api/appointments/${id}`)
      .then(() => setState({...state, appointments}))
    )
    
  }



  useEffect(() => {
    // ⚪️ request to run once after the component renders for the first time
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
    .then(result => {
      // console.log('📆',result[0].data);  //🚨🚨🚨
      // console.log('🧾',result[1].data);  //🚨🚨🚨
      // console.log('👔',result[2].data);  //🚨🚨🚨
      setState(prev => ({...prev, days: result[0].data, appointments: result[1].data, interviewers: result[2].data}));
    })
  },[])
  
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
            days={state.days}
            value={state.day}
            onChange={setDay}
          />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
