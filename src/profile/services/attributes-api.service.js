import http from '@/shared/services/http-common'
import Attribute from '@/profile/domain/attribute.entity'

export default class AttributesService {
  getAll () {
    return http.get('/attributes')
      .then(response => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return data.resource.map(attribute => new Attribute(attribute))
      })
  }

  getAllByProfileId (profileId) {
    return http.get(`/profile/${profileId}/attributes`)
      .then(response => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return data.resource.map(attribute => new Attribute(attribute))
      })
  }

  assignToProfile (profileId, attributeId) {
    return http.put(`/profiles/${profileId}/attributes/${attributeId}`)
      .then(response => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return data.resource
      })
  }

  assignListToProfile (profileId, attributeIds) {
    return http.put(`/profiles/${profileId}/attributes`, attributeIds)
      .then(response => {
        const data = response.data
        if (!data.success) { throw new Error(data.message) }
        return data.resource
      })
  }
}
