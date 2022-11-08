export default class Profile {
  constructor ({ id = '', name = '', surname = '', phone = { number: '', code: '' } }) {
    this.id = id
    this.name = name
    this.surname = surname
    this.phone = phone
  }
}
