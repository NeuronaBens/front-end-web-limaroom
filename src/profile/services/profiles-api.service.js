import http from '@/shared/services/http-common'

export default class ProfilesService {
  getAll () {
    return http.get('/profiles')
  }

  getByUserId (userId) {
    return http.get(`/profiles?userId=${userId}`)
  }

  create (data, userId) {
    console.log(data)
    return http.post(`/profiles?userId=${userId}`, JSON.stringify(data))
      .then(response => {
        if (response.data) {
          const user = JSON.parse(localStorage.getItem('user'))
          user.hasProfile = true
          localStorage.setItem('user', JSON.stringify(user))
          return response.data
        }
        return null
      })
  }

  update (id, data) {
    return http.put(`/profiles/${id}`, data)
  }

  delete (id) {
    return http.delete(`/profiles/${id}`)
  }
}
