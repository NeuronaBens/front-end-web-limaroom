import http from '@/shared/services/http-common'

export default class RoommatesApiService {
  getAllRoommatesWithoutTeam () {
    return http.get('/profiles/without/team')
  }
}
