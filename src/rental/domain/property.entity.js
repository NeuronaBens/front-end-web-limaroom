export default class Property {
  constructor ({ id, name, description, location, price, status, ownerId }) {
    this.id = id
    this.name = name
    this.description = description
    this.location = location
    this.price = price
    this.status = status
    this.ownerId = ownerId
  }
}
