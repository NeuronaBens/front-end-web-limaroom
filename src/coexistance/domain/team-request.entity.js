export default class TeamRequest {
  constructor (
    {
      id = 0,
      studentRequestor = {},
      team = {},
      roommateStatuses = [],
      status
    } = {}) {
    this.id = id
    this.studentRequestor = studentRequestor
    this.team = team
    this.roommateStatuses = roommateStatuses
    this.status = status
  }
}
