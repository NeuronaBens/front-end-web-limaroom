export default class User {
  constructor ({ id, email, role, hasProfile, profile }) {
    this.id = id
    this.email = email
    this.role = role
    this.hasProfile = hasProfile
    this.profile = profile
  }
}
