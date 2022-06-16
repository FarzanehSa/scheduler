const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {

  const getSpotsForDay = (day, appointments) => {
    let spots = 0;
    for (const appointment of day.appointments) {
      if (!appointments[appointment].interview) {
        spots++;
      };
    };
    return spots;
  } 

  const updateDays = (days, appointments) => {

    const updateDays = days.map(day => {
      return {...day, spots: getSpotsForDay(day, appointments)}
    });
    return updateDays;
  }


  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      };
      
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };

    case SET_INTERVIEW: {

      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      const days = updateDays([...state.days], appointments);

      return {
        ...state,
        appointments,
        days
      };
    };

    default:
      throw new Error (
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  };
};

export {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW};