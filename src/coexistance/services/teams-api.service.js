import http from '@/shared/services/http-common'
import Team from '@/coexistance/domain/team.entity'
import Roommate from '@/coexistance/domain/roommate.entity'

export default class TeamsService {
  getAll () {
    return http.get('/teams')
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return data.resource.map(team => new Team(team))
      })
  }

  getById (id) {
    return http.get(`/teams/${id}`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return new Team(response.data.resource)
      })
  }

  getByUserId (userId) {
    return http.get(`/users/${userId}/teams`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return new Team(response.data.resource)
      })
  }

  getAllRoommates (teamId) {
    return http.get(`/teams/${teamId}/roommates`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return data.resource.map(roommate => new Roommate(roommate))
      })
  }

  delete (teamId) {
    return http.delete(`/teams/${teamId}`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return data.resource
      })
  }
}
