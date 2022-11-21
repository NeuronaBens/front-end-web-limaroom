import http from '@/shared/services/http-common'
import Request from '@/roommate/domain/request.entity'
export default class RequestsService {
  getRequestsForMe (requestorId) {
    return http.get(`/users/${requestorId}/roommate/requestors`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return data.resource.map(request => new Request(request))
      })
  }

  getMyRequests (requestedId) {
    return http.get(`/users/${requestedId}/roommate/requested`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return data.resource.map(request => new Request(request))
      })
  }

  accept (requestId) {
    return http.post(`/roommate/request/${requestId}/accept`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return new Request(data.resource)
      })
  }

  decline (requestId) {
    return http.post(`/roommate/request/${requestId}/decline`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return new Request(data.resource)
      })
  }

  create (requestorId, requestedId) {
    return http.post(`/users/requestor/${requestorId}/requested/${requestedId}/roommate/request`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return new Request(data.resource)
      })
  }
}
