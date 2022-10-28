import http from '@/shared/services/http-common'

export default class ProfilesService {
  getAll () {
    return http.get('/profiles')
  }

  getByUserId (userId) {
    return http.get(`/profiles?userId=${userId}`)
  }

  create (data, userId) {
    return http.post(`/profiles?userId=${userId}`, JSON.stringify(data))
  }

  update (id, data) {
    return http.put(`/profiles/${id}`, data)
  }

  delete (id) {
    return http.delete(`/profiles/${id}`)
  }
}
