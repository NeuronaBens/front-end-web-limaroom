import http from '@/shared/services/http-common'
import TeamRequest from '@/coexistance/domain/team-request.entity'

export default class TeamRequestsService {
  create (userId, teamId) {
    return http.post(`/users/${userId}/teams/${teamId}/request`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return new TeamRequest(data.resource)
      })
  }

  getAllByTeamId (teamId) {
    return http.get(`/teams/${teamId}/request`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return data.resource.map(request => new TeamRequest(request))
      })
  }

  accept (userId, teamId) {
    return http.put(`/users/${userId}/teams/requests/${teamId}/accept`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return new TeamRequest(data.resource)
      })
  }

  decline (userId, teamId) {
    return http.put(`/users/${userId}/teams/requests/${teamId}/decline`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return new TeamRequest(data.resource)
      })
  }
}
