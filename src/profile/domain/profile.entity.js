export default class Profile {
  constructor (
    {
      id = 0,
      name = '',
      surname = '',
      photoUrl = '',
      gender = '',
      about = '',
      teamStatus = '',
      country = '',
      city = '',
      age = 0,
      phone = { number: '', code: '' },
      createdAt = '',
      attributes = []
    } = {}) {
    this.id = id
    this.name = name
    this.surname = surname
    this.photoUrl = photoUrl
    this.gender = gender
    this.about = about
    this.country = country
    this.phone = phone
    this.city = city
    this.age = age
    this.attributes = attributes
    this.teamStatus = teamStatus
    this.createdAt = createdAt
  }
}
