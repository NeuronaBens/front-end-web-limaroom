export default class Offer {
  constructor (
    {
      id = 0,
      lifecycle = { endAt: '' },
      amount = { price: 0, currency: '' },
      conditions = '',
      status = '',
      visibility = '',
      property = {}
    } = {}) {
    this.id = id
    this.lifecycle = lifecycle
    this.amount = amount
    this.conditions = conditions
    this.status = status
    this.visibility = visibility
    this.property = property
  }
}
