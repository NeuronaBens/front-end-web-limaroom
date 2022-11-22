import http from '@/shared/services/http-common'
import { uploadImage } from '@/shared/infraestructure/firebase/storage'
import Profile from '@/profile/domain/profile.entity'

export default class ProfilesService {
  getAll () {
    return http.get('/profiles')
      .then(response => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return data.resource.map(profile => new Profile(profile))
      })
  }

  getByUserId (userId) {
    return http.get(`/users/${userId}/profiles`)
      .then(response => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return new Profile(data.resource)
      })
  }

  getById (id) {
    return http.get(`/profiles/${id}`)
      .then(response => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return new Profile(data.resource)
      })
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
              return new Profile(response.data.resource)
            }
            return null
          })
      })
  }

  update (id, data) {
    return http.put(`/profiles/${id}`, data)
      .then(response => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return new Profile(data.resource)
      })
  }
}
