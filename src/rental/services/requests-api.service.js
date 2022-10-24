import http from '@/shared/services/http-common'

export default class RequestsService {
  getRequests () {
    return http.get('/rental/request')
  }

  getRequestByUserId (id) {
    return http.get(`/users/${id}/requests`)
  }

  createRequest (data) {
    return http.post('/rental/request', JSON.stringify(data))
  }

  updateRequest (id, data) {
    return http.put(`/requests/${id}`, data)
  }

  deleteRequest (id) {
    return http.delete(`/requests/${id}`)
  }
}
