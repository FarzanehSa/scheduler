// return all appointments (array) for that day.
export function getAppointmentsForDay(state, day) {

  const aimDay = state.days.filter(row => row.name === day)
  // console.log('🟢 Aim Day',aimDay);  // 🚨🚨🚨
  let result = []
  if (aimDay.length > 0) {
    result = (aimDay[0].appointments).map(row => state.appointments[row])
  }
  // console.log('🟢🟢 appointments',result);  // 🚨🚨🚨
  return result;
}

// will return interview object that has 2 keys,
// student = (string) and interviewer = (object)
// if there is no interview => return null
export function getInterview(state, interview) {

  // console.log('⚪️',state);        // 🚨🚨🚨
  // console.log('⚪️⚪️',interview);  // 🚨🚨🚨
  if (interview) {
    const id = interview.interviewer;
    return ({
      student:interview.student,
      interviewer: state.interviewers[interview.interviewer]
      // interviewer: {
      //   id: id,
      //   name: state.interviewers[id].name,
      //   avatar: state.interviewers[id].avatar
      // }
    })
  }
  return null;
}

// return all interviewers (array) for that day.
export function getInterviewersForDay(state, day) {

  const aimDay = state.days.filter(row => row.name === day)
  let result = []
  if (aimDay.length > 0) {
    result = (aimDay[0].interviewers).map(row => state.interviewers[row])
  }
  return result;
}