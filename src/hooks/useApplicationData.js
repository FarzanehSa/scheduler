import { useReducer, useEffect } from "react";
import axios from 'axios';

import reducer, {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW} from '../reducers/application';

const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

export default function useApplicationData() {

  // webSocket.onopen = function (event) {
  //   webSocket.send("ping");
  // }
  // webSocket.onmessage = function (event) {
  //   console.log( "Message Received: ",event.data);
  // }

  // ⚪️ Combined State for day, days and appointment
  const [state, dispatch] = useReducer(reducer, {
    day:"Monday",
    days:[],
    appointments:{},
    interviewers:{}
  });

  const setDay = day => dispatch({type: SET_DAY, day});

  function bookInterview(id, interview) {
    // console.log(id, interview);    //🚨🚨🚨

    return (axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        dispatch({type: SET_INTERVIEW, id, interview});
      })
    );
  }

  function cancelInterview(id) {
    // console.log("delete", id);    //🚨🚨🚨

    return (axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({type: SET_INTERVIEW, id, interview: null});
      })
    );
  }

  useEffect(() => {
    
    webSocket.onmessage = function (event) {
      const recivedData = JSON.parse(event.data);
      dispatch({...recivedData});
    }

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
      const days = result[0].data;
      const appointments = result[1].data;
      const interviewers = result[2].data; 

      dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
    })

    return () => webSocket.close(); 

  },[]);

  return {state, setDay, bookInterview, cancelInterview };
}
