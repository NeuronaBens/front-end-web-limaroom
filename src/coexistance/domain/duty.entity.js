export default class Duty {
  constructor ({ id = 0, title = '', description = '', status = '', dateline = '', roommateList = [] } = {}) {
    this.id = id
    this.title = title
    this.description = description
    this.status = status
    this.dateline = dateline
    this.roommateList = roommateList
  }
}
