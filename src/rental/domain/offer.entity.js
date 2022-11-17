export default class Offer {
  constructor ({ id = 0, lifecycle = { endAt: '' }, amount = { price: 0, currency: '' }, conditions = '', status = '', visibility = '' } = {}) {
    this.id = id
    this.lifecycle = lifecycle
    this.amount = amount
    this.conditions = conditions
    this.status = status
    this.visibility = visibility
  }
}
