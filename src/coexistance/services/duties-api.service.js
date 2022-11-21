import http from '@/shared/services/http-common'
import Duty from '@/coexistance/domain/duty.entity'
import Roommate from '@/coexistance/domain/roommate.entity'

export default class DutiesService {
  getAllByTeamId (teamId) {
    return http.get(`/teams/${teamId}/duties`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return data.resource.map(duty => new Duty(duty))
      })
  }

  getRoommatesAvailablesForDuty (dutyId) {
    return http.get(`/duties/${dutyId}/roommates/available`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return data.resource.map(roommate => new Roommate(roommate))
      })
  }

  create (teamId, data) {
    return http.post(`/teams/${teamId}/duties`, data)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return new Duty(data.resource)
      })
  }

  assignRoommates (dutyId, roommateIds) {
    return http.put(`/duties/${dutyId}`, roommateIds)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return new Duty(data.resource)
      })
  }
}
