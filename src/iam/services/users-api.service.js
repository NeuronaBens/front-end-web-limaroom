import http from '../shared/services/http-common'
export class UsersService {
  sigInUser (data) {
    return http.post('/users/sign-in', data)
  }

  sigUpUser (data) {
    return http.post('/users/sign-up', data)
  }

  getUser (email, passord) {
    return http.post(`/users?email=${email}&password=${passord}`)
  }

  createUser (data) {
    return http.post('/users', data)
  }
}
