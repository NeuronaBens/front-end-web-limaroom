export default class Profile {
  constructor ({ id = 0, name = '', surname = '', photoUrl = '', gender = '', about = '', location = '', phone = { number: '', code: '' } } = {}) {
    this.id = id
    this.name = name
    this.surname = surname
    this.photoUrl = photoUrl
    this.gender = gender
    this.about = about
    this.location = location
    this.phone = phone
  }
}
