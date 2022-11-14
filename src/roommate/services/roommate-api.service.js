import http from '@/shared/services/http-common'

export default class RoommatesApiService {
  getAllRoommatesWithoutTeam (id) {
    return http.get(`/users/${id}/profiles/without/team`)
  }
}
