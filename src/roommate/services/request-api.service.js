import http from '@/shared/services/http-common'

export default class RequestsService {
  getRequestsForMe (requestorId) {
    return http.get(`/users/${requestorId}/roommate/requestors`)
  }

  getMyRequests (requestedId) {
    return http.get(`/users/${requestedId}/roommate/requested`)
  }

  acceptRequest (requestId) {
    return http.post(`/roommate/request/${requestId}/accept`)
  }

  declineRequest (requestId) {
    return http.post(`/roommate/request/${requestId}/decline`)
  }

  createRequest (request) {
    return http.post(`/users/requestor/${request.requestorId}/requested/${request.requestedId}/roommate/request`)
  }
}
