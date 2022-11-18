import http from '@/shared/services/http-common'
export default class UsersService {
  signIn (id) {
    return http.get(`/users/${id}`)
      .then(response => {
        if (response.data.resource) {
          const { id, role, active, profile } = response.data.resource
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

    return http.post('/users/register', user)
      .then(response => {
        if (response.data.resource) {
          const { id, role, active } = response.data.resource
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

  changeRole (id) {
    return http.put(`/users/${id}/assign/lessor`)
      .then(response => {
        if (response.data.resource) {
          const { id, role, active, profile } = response.data.resource
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

  signOut () {
    localStorage.removeItem('user')
  }

  getById (id) {
    return http.get(`/users/${id}`)
  }
}
