import instance from './instance'
const accept = 'application/json'

export default () => {
  return {
    getWorkSchedule(userId, date) {
      return instance.get(`/users/${userId}/work-schedules/${date}`, { // moment().format('YYYY-MM-DD)
        headers: { accept }
      })
    }
  }
}
