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


