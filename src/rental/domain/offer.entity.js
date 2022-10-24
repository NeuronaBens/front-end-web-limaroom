export default class Offer {
  constructor ({ id, propertyId, userId, status, price, createdAt }) {
    this.id = id
    this.propertyId = propertyId
    this.userId = userId
    this.status = status
    this.createdAt = createdAt
  }
}
