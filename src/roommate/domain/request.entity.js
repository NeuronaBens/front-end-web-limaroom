export default class Request {
  constructor ({ id, requestorId, requestedId } = {}) {
    this.id = id
    this.requestorId = requestorId
    this.requestedId = requestedId
  }
}
