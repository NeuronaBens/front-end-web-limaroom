import http from '@/shared/services/http-common'
export default class UsersService {
  signIn (id) {
    return http.get(`/users/${id}`)
      .then(response => {
        if (response.data) {
          const { id, role, active, profile } = response.data
          const hasProfile = profile !== null
          const user = {
            id,
            role: role.name,
            active,
            hasProfile,
            profileId: profile.id ? profile.id : 0
          }

          localStorage.setItem('user', JSON.stringify(user))
          return user
        }
        return null
      })
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
            active,
            hasProfile: false,
            profileId: 0
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

  getById (id) {
    return http.get(`/users/${id}`)
  }
}
