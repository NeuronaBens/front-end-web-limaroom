import http from '@/shared/services/http-common'
export default class UsersService {
  signIn ({ email, password }) {
    return http.get(`/users?email=${email}`)
      .then(response => {
        if (response.data) {
          const { id, role } = response.data
          const user = {
            id,
            role: role.name
          }
          console.log('user: ', user)
          localStorage.setItem('user', JSON.stringify(user))
          return user
        }
        return null
      })
    // return http.get(`/users?email=${email}`)
  }

  signOut () {
    localStorage.removeItem('user')
  }

  getUser (email, passord) {
    return http.post(`/users?email=${email}&password=${passord}`)
  }

  createUser (data) {
    return http.post('/users', data)
  }
}
