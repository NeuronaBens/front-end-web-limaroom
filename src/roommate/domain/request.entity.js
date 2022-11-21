export default class Request {
  constructor ({ id = 0, studentRequestor = {}, studentRequested = {}, status = '' } = {}) {
    this.id = id
    this.studentRequestor = studentRequestor
    this.studentRequested = studentRequested
    this.status = status
  }
}
