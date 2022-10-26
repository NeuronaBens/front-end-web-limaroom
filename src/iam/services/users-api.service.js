import http from '@/shared/services/http-common'
export default class UsersService {
  // TODO: Create an endpoint to get the user by id
  // ? Id exist: return user
  // ? Id does not exist: return null

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

  signUp ({ id, address }) {
    const user = {
      id,
      email: {
        address
      }
    }
    console.log(user)

    return http.post('/users/register', user)
      .then(response => {
        console.log(response)
        if (response.data) {
          const { id, role, active } = response.data
          const user = {
            id,
            role: role.name,
            active
          }
          localStorage.setItem('user', JSON.stringify(user))
          return user
        }
        return null
      })
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
