import http from '@/shared/services/http-common'

export default class RequestsService {
  getRequests () {
    return http.get('/rental/request')
  }

  getRequestsByUserId (id) {
    return http.get(`/users/${id}/requests`)
  }

  getRequestsByOfferId (id) {
    return http.get(`/rentaloffers/${id}/requests`)
  }

  createRequest (data) {
    return http.post('/rental/request', JSON.stringify(data))
  }

  acceptRequest (id) {
    return http.put(`/requests/${id}/accept`)
  }

  declineRequest (id) {
    return http.put(`/requests/${id}/decline`)
  }
}
