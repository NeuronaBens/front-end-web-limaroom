import http from '@/shared/services/http-common'
import Profile from '@/profile/domain/profile.entity'
export default class RoommatesApiService {
  getAllRoommatesWithoutTeam (id) {
    return http.get(`/users/${id}/profiles/without/team`)
      .then(response => {
        const data = response.data
        if (!data.success) throw new Error(data.message)
        return data.resource.map(profile => new Profile(profile))
      })
  }
}
