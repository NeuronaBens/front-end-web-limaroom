export default class Team {
  constructor ({ id = 0, name = '', roommates = [], duties = [] } = {}) {
    this.id = id
    this.name = name
    this.roommates = roommates
    this.duties = duties
  }
}
