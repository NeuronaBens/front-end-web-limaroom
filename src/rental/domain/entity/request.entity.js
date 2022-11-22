export default class Request {
  constructor ({ id = 0, status = '', message = '', studentProfile = {}, rentalOffering = {} } = {}) {
    this.id = id
    this.status = status
    this.message = message
    this.studentProfile = studentProfile
    this.rentalOffering = rentalOffering
  }
}
