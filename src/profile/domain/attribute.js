export default class Attribute {
  constructor ({ id = 0, name = '', value = '', type = '' } = {}) {
    this.id = id
    this.name = name
    this.type = type
    this.value = value
  }
}
