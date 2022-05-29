import { useState,useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  
  // ⚪️ Combined State for day, days and appointment
  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments:{},
    interviewers:{}
  });
  
  const setDay = day => setState({...state, day});

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
    // const putApiPromise = axios.put(`/api/appointments/${id}`, {interview});
    // const secondPromise = putApiPromise.then(() => setState({...state, appointments}))
    // return secondPromise;
    return (
    axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        // setState({...state, appointments})
        return axios.get("/api/days")
      })
      .then (result => {
        setState(prev => ({...prev, days: result.data, appointments }));
      })
    )
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
      .then(() => {
        // setState({...state, appointments})
        return axios.get("/api/days")
      })
      .then(result => {
        setState(prev => ({...prev, days: result.data, appointments }));
      })
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

  return {state, setDay, bookInterview, cancelInterview }
}
