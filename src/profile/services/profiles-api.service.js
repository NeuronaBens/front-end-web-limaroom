import http from '@/shared/services/http-common'
import { uploadImage } from '@/shared/config/firebase/storage'

export default class ProfilesService {
  getAll () {
    return http.get('/profiles')
  }

  getByUserId (userId) {
    return http.get(`/users/${userId}/profiles`)
  }

  getById (id) {
    return http.get(`/profiles/${id}`)
  }

  create (image, { profile, userId }) {
    return uploadImage(`profiles/${userId}`, image)
      .then((downloadUrl) => {
        profile.photoUrl = downloadUrl
        return http.post(`/profiles?userId=${userId}`, JSON.stringify(profile))
          .then(response => {
            if (response.data.resource) {
              const user = JSON.parse(localStorage.getItem('user'))
              user.hasProfile = true
              user.profileId = response.data.resource.id
              localStorage.setItem('user', JSON.stringify(user))
              return response.data.resource
            }
            return null
          })
      })
  }

  update (id, data) {
    return http.put(`/profiles/${id}`, data)
  }

  delete (id) {
    return http.delete(`/profiles/${id}`)
  }
}
