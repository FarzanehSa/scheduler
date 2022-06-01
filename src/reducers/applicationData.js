const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      }
      
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      }

    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview
      }
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      }
      return {
        ...state,
        appointments
      }
    }

    default:
      throw new Error (
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, reducer}